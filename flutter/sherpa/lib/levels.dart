/*
 *        levels.dart
 *  
 *    Information about different priority levels
 * 
 **/
/*	Copyright 2023 Brown University -- Steven P. Reiss			*/
/// *******************************************************************************
///  Copyright 2023, Brown University, Providence, RI.				 *
///										 *
///			  All Rights Reserved					 *
///										 *
///  Permission to use, copy, modify, and distribute this software and its	 *
///  documentation for any purpose other than its incorporation into a		 *
///  commercial product is hereby granted without fee, provided that the 	 *
///  above copyright notice appear in all copies and that both that		 *
///  copyright notice and this permission notice appear in supporting		 *
///  documentation, and that the name of Brown University not be used in 	 *
///  advertising or publicity pertaining to distribution of the software 	 *
///  without specific, written prior permission. 				 *
///										 *
///  BROWN UNIVERSITY DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS		 *
///  SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND		 *
///  FITNESS FOR ANY PARTICULAR PURPOSE.  IN NO EVENT SHALL BROWN UNIVERSITY	 *
///  BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY 	 *
///  DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,		 *
///  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS		 *
///  ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE 	 *
///  OF THIS SOFTWARE.								 *
///										 *
///*******************************************************************************/

PriorityLevel overrideLevel = PriorityLevel("Override", 800, 1000);
PriorityLevel highLevel = PriorityLevel("High Priority", 600, 800);
PriorityLevel mediumLevel = PriorityLevel("Medium Priority", 400, 600);
PriorityLevel lowLevel = PriorityLevel("Low Priority", 200, 400);
PriorityLevel defaultLevel = PriorityLevel("Default", 0, 200);
PriorityLevel allLevel = PriorityLevel("All", 0, 1000);

num minimumPriority = 0;
num maximumPriority = 1000;

List<PriorityLevel> allLevels = [
  defaultLevel,
  lowLevel,
  mediumLevel,
  highLevel,
  overrideLevel,
];

class PriorityLevel {
  String name;
  num lowPriority;
  num highPriority;

  PriorityLevel(this.name, this.lowPriority, this.highPriority);

  PriorityLevel? getHigherLevel() {
    bool next = false;
    for (PriorityLevel pl in allLevels) {
      if (pl == this) next = true;
      if (next) return pl;
    }
    return null;
  }

  PriorityLevel? getLowerLevel() {
    PriorityLevel? rslt;
    for (PriorityLevel pl in allLevels) {
      if (pl == this) return rslt;
      rslt = pl;
    }
    return null;
  }
}