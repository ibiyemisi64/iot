/********************************************************************************/
/*										*/
/*		CatbridgeConstants.java 					*/
/*										*/
/*	Constants for bridges from CATRE to other services			*/
/*										*/
/********************************************************************************/
/*	Copyright 2013 Brown University -- Steven P. Reiss		      */
/*********************************************************************************
 *  Copyright 2013, Brown University, Providence, RI.				 *
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



package edu.brown.cs.catre.catbridge;


public interface CatbridgeConstants
{

int BRIDGE_PORT = 3661;
String BRIDGE_HOST = "localhost";

int CEDES_PORT = 3333;
String CEDES_HOST = "sherpa.cs.brown.edu";



/********************************************************************************/
/*										*/
/*	Time Constants								*/
/*										*/
/********************************************************************************/

long T_SECOND = 1000;
long T_MINUTE = 60 * T_SECOND;
long T_HOUR = 60 * T_MINUTE;
long T_DAY = 24 * T_HOUR;






}	// end of interface CatbridgeConstants




/* end of CatbridgeConstants.java */

