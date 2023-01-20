/********************************************************************************/
/*										*/
/*		CatmodelConstants.java						*/
/*										*/
/*	Constants for universe/world models					*/
/*										*/
/********************************************************************************/
/*	Copyright 2023 Brown University -- Steven P. Reiss			*/
/*********************************************************************************
 *  Copyright 2023, Brown University, Providence, RI.				 *
 *										 *
 *			  All Rights Reserved					 *
 *										 *
 *  Permission to use, copy, modify, and distribute this software and its	 *
 *  documentation for any purpose other than its incorporation into a		 *
 *  commercial product is hereby granted without fee, provided that the 	 *
 *  above copyright notice appear in all copies and that both that		 *
 *  copyright notice and this permission notice appear in supporting		 *
 *  documentation, and that the name of Brown University not be used in 	 *
 *  advertising or publicity pertaining to distribution of the software 	 *
 *  without specific, written prior permission. 				 *
 *										 *
 *  BROWN UNIVERSITY DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS		 *
 *  SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND		 *
 *  FITNESS FOR ANY PARTICULAR PURPOSE.  IN NO EVENT SHALL BROWN UNIVERSITY	 *
 *  BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY 	 *
 *  DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,		 *
 *  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS		 *
 *  ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE 	 *
 *  OF THIS SOFTWARE.								 *
 *										 *
 ********************************************************************************/




package edu.brown.cs.catre.catmodel;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;

public interface CatmodelConstants
{

String UNIVERSE_PREFIX = "UNIV_";




/********************************************************************************/
/*										*/
/*	Time Constants								*/
/*										*/
/********************************************************************************/

long T_SECOND = 1000;
long T_MINUTE = 60 * T_SECOND;
long T_HOUR = 60 * T_MINUTE;
long T_DAY = 24 * T_HOUR;




/********************************************************************************/
/*										*/
/*	Decoding methods							*/
/*										*/
/********************************************************************************/

class Coder {

   public static String unescape(String s) {
      if (s == null) return null;
      try {
	 return URLDecoder.decode(s,"UTF-8");
       }
      catch (UnsupportedEncodingException e) {
	 return s;
       }
    }

   public static String escape(String s) {
      if (s == null) return null;
      try {
	 return URLEncoder.encode(s,"UTF-8");
       }
      catch (UnsupportedEncodingException e) {
	 return s;
       }
    }

}	// end of inner class Coder





/********************************************************************************/
/*										*/
/*	Calendar Event								*/
/*										*/
/********************************************************************************/

interface CalendarEvent {

   long getStartTime();
   long getEndTime();
   Map<String,String> getProperties();

}	// end of inner interface CalendarEvent


}	// end of interface CatmodelConstants




/* end of CatmodelConstants.java */

