/*
 *      actionpage.dart
 *
 *   Overview page for the viewing and editing conditions
 */
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

import 'package:flutter/material.dart';
import 'package:sherpa/widgets.dart' as widgets;
import 'package:sherpa/util.dart' as util;
import 'package:sherpa/models/catremodel.dart';
import 'package:flutter_spinbox/material.dart';

/// ******
///   Widget definitions
/// ******

class SherpaActionWidget extends StatefulWidget {
  final CatreDevice _forDevice;
  final CatreRule _forRule;
  final CatreAction _forAction;

  const SherpaActionWidget(this._forDevice, this._forRule, this._forAction,
      {super.key});

  @override
  State<SherpaActionWidget> createState() => _SherpaActionWidgetState();
}

class _SherpaActionWidgetState extends State<SherpaActionWidget> {
  late CatreAction _forAction;
  late CatreDevice _forDevice;
  late CatreRule _forRule;
  final TextEditingController _labelControl = TextEditingController();
  final TextEditingController _descControl = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  _SherpaActionWidgetState();

  @override
  initState() {
    _forAction = widget._forAction;
    _forDevice = widget._forDevice;
    _forRule = widget._forRule;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    String ttl = _forAction.getLabel();
    List<CatreTransition> trns = findValidTransitions();

    return Scaffold(
      appBar: AppBar(title: Text(ttl), actions: [
        widgets.topMenuAction([
          widgets.MenuAction('Save Changes', _saveAction),
          widgets.MenuAction('Revert condition', _revertAction),
        ]),
      ]),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                widgets.fieldSeparator(),
                widgets.textFormField(
                  hint: "Descriptive label for condition",
                  label: "Condition Label",
                  validator: _labelValidator,
                  onSaved: (String? v) => _forAction.setLabel(v),
                  controller: _labelControl,
                ),
                widgets.fieldSeparator(),
                widgets.textFormField(
                    hint: "Detailed condition description",
                    label: "Condition Description",
                    controller: _descControl,
                    onSaved: (String? v) => _forAction.setDescription(v),
                    maxLines: 3),
                widgets.fieldSeparator(),
                // add transition selector
                // add parameter widgets
                widgets.fieldSeparator(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    widgets.submitButton("Accept", _saveAction),
                    widgets.submitButton("Cancel", _revertAction),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String? _labelValidator(String? lbl) {
    if (lbl == null || lbl.isEmpty) {
      return "Action must have a label";
    }
    return null;
  }

  List<CatreTransition> findValidTransitions() {
    bool trig = _forRule.isTrigger();

    List<CatreTransition> rslt = [];
    for (CatreTransition ct in _forDevice.getTransitions()) {
      String typ = ct.getTransitionType();
      switch (typ) {
        case "STATE_CHANGE":
        case "TEMPORARY_CHANGE":
          if (trig) continue;
          break;
        case "TRIGGER":
          if (!trig) continue;
          break;
      }
      rslt.add(ct);
    }

    return rslt;
  }

  List<Widget> _createParameterWidgets() {
    List<Widget> rslt = [];
    List<_ActionParameter> sensors = getParameters();
    for (_ActionParameter ap in sensors) {
      Widget? w1 = ap.getValueWidget(context, ap.value);
      if (w1 != null) {
        rslt.add(Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[Text("${ap.name}:  "), w1],
        ));
      }
    }
    return rslt;
  }

  List<_ActionParameter> getParameters() {
    List<_ActionParameter> plst = [];
    if (!_forAction.isValid()) return plst;
    CatreTransition ct = _forAction.getTransition();
    for (CatreParameter cp in ct.getParameters()) {
      plst.add(_ActionParameter(ct, cp));
    }
    return plst;
  }

  Widget _createRepeatSelector() {
    return widgets.dropDownWidget<util.RepeatOption>(
        util.getRepeatOptions(), (util.RepeatOption ro) => ro.name,
        onChanged: _setRepeatOption);
  }

  void _setStartTime(TimeOfDay time) {
    print("Set start time");
  }

  void _setStartDate(DateTime date) {
    print("Set start time");
  }

  void _setEndDate(DateTime date) {
    print("Set start time");
  }

  void _setEndTime(TimeOfDay time) {
    print("Set start time");
  }

  void _setDays(List<String> days) {
    print("Set Days $days");
  }

  void _setRepeatOption(util.RepeatOption? opt) {
    print("Set Repeat $opt");
  }

  void _saveAction() {}
  void _revertAction() {}
}

class _ActionParameter {
  final CatreTransition _transition;
  final CatreParameter _parameter;
  const _ActionParameter(this._transition, this._parameter);

  String get name {
    return _parameter.getLabel();
  }

  String? get value {
    return _parameter.getValue();
  }

  Widget? getValueWidget(context, dynamic value) {
    Widget? w;
    switch (_parameter.getParameterType()) {
      case "BOOLEAN":
      case "ENUM":
      case "STRINGLIST":
      case "ENUMREF":
        List<String>? vals = _parameter.getValues();
        if (vals != null) {
          value ??= vals[0];
          w = widgets.dropDownWidget(vals, null, value: value);
        }
        break;
      case "TIME":
        widgets.TimeFormField tff = widgets.TimeFormField(context, hint: name);
        w = tff.widget;
        break;
      case "DATETIME":
        break;
      case "DATE":
        widgets.DateFormField dff =
            widgets.DateFormField(context, hint: name, initialDate: value);
        w = dff.widget;
        break;
      case "INTEGER":
        value ??= _parameter.getMinValue();
        w = SpinBox(
            min: _parameter.getMinValue() as double,
            max: _parameter.getMaxValue() as double,
            value: value,
            onChanged: (value) => {});
        break;
      case "REAL":
        value ??= _parameter.getMaxValue();
        w = SpinBox(
            min: _parameter.getMinValue() as double,
            max: _parameter.getMaxValue() as double,
            value: value,
            decimals: 1,
            onChanged: (value) => {});
        break;
      case "STRING":
        w = TextFormField(initialValue: value);
        break;
    }

    return w;
  }
}
