<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

---
name: Portfolio
description: Neo-brutalist resume portfolio that proves you can ship.
colors:
  primary: "#c43d2a"
  accent: "#f5e642"
  ink: "#0a0a0a"
  neutral-bg: "#ffffff"
  surface: "#f5f5f0"
typography:
  display:
    fontFamily: "Archivo Black, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Lexend Mega, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
rounded:
  sm: "0px"
  md: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.neutral-bg}"
---

# Design System: Portfolio

## Overview

**Creative North Star: "The Constructivist Business Card"**

Neo-brutalism as proof of craft: thick ink borders, hard offset shadows, saturated blocks of color, and typography that shouts without apologizing. Archivo Black carries hero weight; Lexend Mega handles labels, navigation, and body rhythm. Motion is choreographed but respects reduced-motion preferences.

The system explicitly rejects corporate consulting polish, generic template portfolios, glassmorphism, gradient text, and timid beige-neutral palettes.

**Key Characteristics:**

- Hard 3px ink borders on interactive surfaces
- Offset box-shadow (6–8px) instead of soft blur shadows
- Committed color strategy: crimson primary + electric yellow accent on pure white
- Zero-to-minimal border radius (0–4px max on cards)
- Animation-forward entrances with staggered reveals

## Colors

Committed palette: one saturated primary carries hero CTAs and key blocks; accent yellow marks highlights and badges; pure white ground keeps HR scanning fast.

### Primary

- **Constructivist Crimson** (#c43d2a / oklch(0.653 0.185 33.5)): Primary buttons, hero accents, active nav states. White text on fills.

### Accent

- **Signal Yellow** (#f5e642 / oklch(0.92 0.16 102)): Badges, highlight strips, secondary CTAs, project tags. Ink text on fills.

### Neutral

- **Pure Ground** (#ffffff): Page background. No hidden warmth.
- **Block Surface** (#f5f5f0): Card and section backgrounds.
- **Ink** (#0a0a0a): Body text, borders, shadows. All borders use ink at 3px.

**The Hard Edge Rule.** Surfaces never use both a 1px border AND a soft drop shadow. Pick hard offset shadow OR a thick border — neo-brutalism uses both border AND offset shadow together only when the shadow is hard (zero blur).

## Typography

**Display Font:** Archivo Black (Google Fonts)
**Body / Label Font:** Lexend Mega (Google Fonts)

**Character:** Display type is heavy, compressed, and unapologetic. Lexend Mega adds geometric clarity for labels, nav, and readable body copy at smaller sizes.

### Hierarchy

- **Display** (900, clamp(2.5rem, 8vw, 5.5rem), 1.05): Hero name and section titles only.
- **Headline** (700, clamp(1.5rem, 4vw, 2.25rem), 1.15): Project titles, sub-section headers.
- **Title** (600, 1.125rem, 1.3): Card titles, form labels.
- **Body** (400, 1rem, 1.6): Paragraphs, descriptions. Max 65–75ch.
- **Label** (500, 0.75rem, 0.08em tracking, uppercase): Nav items, tags, metadata.

**The Display Spacing Floor Rule.** Display letter-spacing never goes below -0.04em.

## Elevation

Flat-by-default with structural depth via hard offset shadows, not blur.

### Shadow Vocabulary

- **Brutal Lift** (`box-shadow: 6px 6px 0 #0a0a0a`): Cards, buttons at rest.
- **Brutal Press** (`box-shadow: 2px 2px 0 #0a0a0a`): Active/pressed state.
- **Brutal Hover** (`box-shadow: 8px 8px 0 #0a0a0a; transform: translate(-2px, -2px)`): Hover lift.

**The No Blur Rule.** Shadow blur radius is always 0. Depth comes from offset only.

## Components

### Buttons

- **Shape:** 0px radius, 3px ink border
- **Primary:** Crimson fill, white text, brutal lift shadow
- **Hover:** Translate up-left 2px, expand shadow
- **Secondary:** Yellow fill, ink text

### Cards / Containers

- **Corner Style:** 0–4px
- **Background:** Surface or accent blocks
- **Border:** 3px solid ink
- **Shadow:** 6px 6px 0 ink
- **Internal Padding:** 24–32px

### Navigation

- Lexend Mega uppercase labels, 3px bottom border on active, sticky header with yellow or white bg

### Inputs / Fields

- 3px ink border, no radius, focus: 4px offset yellow highlight ring

## Do's and Don'ts

### Do:

- **Do** use Archivo Black for hero display and Lexend Mega for everything else.
- **Do** animate with Framer Motion: staggered section reveals, hover micro-lifts.
- **Do** provide `prefers-reduced-motion` fallbacks (instant or opacity-only).
- **Do** keep recruiter scan path obvious: hero → proof → contact.

### Don't:

- **Don't** look too corporate or overly clean consulting style.
- **Don't** use gradient text, glassmorphism, or soft ghost-card shadows.
- **Don't** use border-radius above 16px on cards.
- **Don't** gate content visibility on animation completion.
- **Don't** use tiny uppercase tracked eyebrows above every section.
