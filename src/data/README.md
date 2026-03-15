# Data notes

This directory currently contains only site-configuration modules and rollout notes.

Once you start loading real data, consider one of these patterns:

- Keep cleaned JSON and CSV files inside `src/data/` and import them directly into Astro pages.
- Store source files and cleaning scripts outside `src/` and write cleaned output back into a build-friendly data directory.
- Keep a short `sources.md` file documenting each recurring dataset, its originating source, and update cadence.

Avoid shipping invented metrics. Use placeholders or empty states until the real data pipeline is ready.
