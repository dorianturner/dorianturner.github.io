window.projectData = {
  slug: "cocktail-pi",
  title: "Cocktail Pi",
  source: "cocktailpi",
  category: "Embedded C / Raspberry Pi",
  summary: "A Raspberry Pi drink dispenser using GPIO pumps, button callbacks, LCD output, and a finite state machine for drink selection and dispensing.",
  facts: [["Stack", "C · pigpio · I²C LCD"], ["Control", "GPIO buttons and pumps"], ["Result", "3rd of 58 · extension prize"]],
  diagram: [["Buttons", "GPIO callbacks"], ["FSM", "selection state"], ["Recipe", "ingredient parts"], ["Pumps", "parallel timers"], ["LCD", "state output"]],
  overview: "maker.c maps recipes to ingredient part counts, turns each active pump on in its own thread, and controls the LCD and selection buttons through pigpio. pigpio_emu.c provides a local emulator for development and tests.",
  sections: [
    ["State machine", "Start, drink-selection, Dispensing, FinishDispensing, Error, and terminal states control which inputs are accepted and what the LCD displays."],
    ["Parallel pumps", "Each ingredient with a non-zero part count gets a timer thread. Duration is calculated from part count, VOLUME_PER_PART, and TIME_PER_ML; all pump threads are joined before completion."],
    ["Safety", "Allocation and thread failures set pouring_error, stop all pumps, and move the state machine to Error. A final stop_all_pumps call runs after every pour."],
  ],
  sourceFiles: ["maker.c", "maker.h", "lcd_i2c.c", "pigpio_emu.c", "Makefile"],
  sourceUrl: "https://github.com/dorianturner/cocktailpi",
  widget: "cocktail-pi",
};
