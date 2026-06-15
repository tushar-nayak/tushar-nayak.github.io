#!/usr/bin/env python3

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
RESUME_JSON = ROOT / "assets" / "json" / "resume.json"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUTPUT_DIR = ROOT / "output" / "pdf"
ASSET_PDF = ROOT / "assets" / "pdf" / "Resume.pdf"
OUTPUT_PDF = OUTPUT_DIR / "Tushar_Nayak_Resume.pdf"


def load_resume():
    with RESUME_JSON.open() as f:
        return json.load(f)


def format_date(date_str):
    if not date_str:
        return "Present"
    year, month, *_ = date_str.split("-")
    month_names = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    }
    return f"{month_names.get(month, month)} {year}"


def date_range(start, end):
    return f"{format_date(start)} - {format_date(end)}"


def add_paragraph(story, text, style):
    story.append(Paragraph(text, style))


def build_pdf(data):
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ASSET_PDF.parent.mkdir(parents=True, exist_ok=True)

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#111827"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeaderMeta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#374151"),
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13,
            textColor=colors.HexColor("#0f172a"),
            spaceBefore=8,
            spaceAfter=6,
            uppercase=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Role",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=colors.HexColor("#111827"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            parent=styles["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=9.5,
            leading=12,
            textColor=colors.HexColor("#4b5563"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=12,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletSmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=11.4,
            leftIndent=10,
            firstLineIndent=-7,
            bulletIndent=0,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=2,
        )
    )

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=LETTER,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.48 * inch,
    )

    basics = data["basics"]
    profiles = {p["network"]: p["url"] for p in basics.get("profiles", [])}
    story = []

    add_paragraph(story, basics["name"], styles["Name"])
    add_paragraph(story, basics["label"], styles["HeaderMeta"])
    header_line = " | ".join(
        [
            basics["email"],
            basics["url"],
            profiles.get("LinkedIn", ""),
            profiles.get("GitHub", ""),
        ]
    )
    add_paragraph(story, header_line, styles["HeaderMeta"])
    add_paragraph(story, basics["summary"], styles["BodySmall"])
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", color=colors.HexColor("#9ca3af"), thickness=0.7))

    def section(title):
        add_paragraph(story, title, styles["Section"])

    def bullets(items):
        for item in items:
            add_paragraph(story, item, styles["BulletSmall"].clone("b"),)

    section("Experience")
    for entry in data["work"]:
        add_paragraph(story, entry["position"], styles["Role"])
        meta = f'{entry["name"]} | {entry.get("location", "")} | {date_range(entry.get("startDate"), entry.get("endDate"))}'
        add_paragraph(story, meta, styles["Meta"])
        add_paragraph(story, entry["summary"], styles["BodySmall"])
        for item in entry.get("highlights", []):
            story.append(Paragraph(item, styles["BulletSmall"], bulletText="-"))
        story.append(Spacer(1, 3))

    section("Education")
    for entry in data["education"]:
        add_paragraph(story, entry["studyType"], styles["Role"])
        meta = f'{entry["institution"]} | {entry.get("location", "")} | {date_range(entry.get("startDate"), entry.get("endDate"))}'
        add_paragraph(story, meta, styles["Meta"])
        add_paragraph(story, entry["area"], styles["BodySmall"])
        add_paragraph(story, "Coursework: " + ", ".join(entry.get("courses", [])), styles["BodySmall"])
        story.append(Spacer(1, 3))

    section("Projects")
    for entry in data["projects"]:
        add_paragraph(story, entry["name"], styles["Role"])
        add_paragraph(story, date_range(entry.get("startDate"), entry.get("endDate")), styles["Meta"])
        add_paragraph(story, entry["summary"], styles["BodySmall"])
        for item in entry.get("highlights", []):
            story.append(Paragraph(item, styles["BulletSmall"], bulletText="-"))
        story.append(Spacer(1, 3))

    section("Publications")
    for entry in data["publications"]:
        add_paragraph(story, entry["name"], styles["Role"])
        meta = f'{entry["publisher"]} | {format_date(entry.get("releaseDate"))}'
        add_paragraph(story, meta, styles["Meta"])
        add_paragraph(story, entry["summary"], styles["BodySmall"])
        story.append(Spacer(1, 2))

    section("Awards")
    for entry in data["awards"]:
        add_paragraph(story, entry["title"], styles["Role"])
        meta = f'{entry["awarder"]} | {format_date(entry.get("date"))}'
        add_paragraph(story, meta, styles["Meta"])
        add_paragraph(story, entry["summary"], styles["BodySmall"])
        story.append(Spacer(1, 2))

    section("Skills")
    for entry in data["skills"]:
        skill_line = f'<b>{entry["name"]}:</b> ' + ", ".join(entry.get("keywords", []))
        add_paragraph(story, skill_line, styles["BodySmall"])

    doc.build(story)
    ASSET_PDF.write_bytes(OUTPUT_PDF.read_bytes())


if __name__ == "__main__":
    build_pdf(load_resume())
