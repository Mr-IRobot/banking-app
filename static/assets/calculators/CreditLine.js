
KJE.CreditLineCalc=function(){this.LOAN_TO_VALUE_RATIO_DECIMALS=0;this.MAX_OF_LOANS=0;this.MAXIMUM_OF_LOANS_POSSIBLE=null;this.YOUR_CREDIT_LIMIT=null;this.LOAN_TO_VALUE=null;this.NOEDIT_LOAN_TO_VALUE=KJE.parameters.get("NOEDIT_LOAN_TO_VALUE",false);this.LOAN_TO_VALUE1=KJE.parameters.get("LOAN_TO_VALUE1",0.8);this.LOAN_TO_VALUE2=KJE.parameters.get("LOAN_TO_VALUE2",0.9);this.LOAN_TO_VALUE3=KJE.parameters.get("LOAN_TO_VALUE3",1);this.XAXIS_FACTOR=KJE.parameters.get("XAXIS_FACTOR",1);this.SCENARIO_NUMBER=0;this.MSG_LEGEND_START=KJE.parameters.get("MSG_LEGEND_START","Loan to value");this.MSG_LEGEND_END=KJE.parameters.get("MSG_LEGEND_END","");this.MSG_LINE_OF_CREDIT=KJE.parameters.get("MSG_LINE_OF_CREDIT","Line of Credit");this.LOCATION="";this.DS_CREDITLINES=null;this.cats=new Array(20);this.sSchedule=new KJE.Repeating()};KJE.CreditLineCalc.prototype.clear=function(){this.APPRAISED_VALUE_OF_YOUR_HOME=0;this.MORTGAGES_YOU_OWE=0;this.LOAN_TO_VALUE_RATIO=0};KJE.CreditLineCalc.prototype.calculate=function(l){var e=KJE;var b=this.APPRAISED_VALUE_OF_YOUR_HOME;var k=this.MORTGAGES_YOU_OWE;var m=this.LOAN_TO_VALUE_RATIO/100;var a=0;if((m==this.LOAN_TO_VALUE1)||(m==this.LOAN_TO_VALUE2)||(m==this.LOAN_TO_VALUE3)){a=(this.LOAN_TO_VALUE3<0?2:3);this.LOAN_TO_VALUE=KJE.FloatArray(a);this.LOAN_TO_VALUE[0]=this.LOAN_TO_VALUE1;this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE3}if(m==this.LOAN_TO_VALUE1){this.SCENARIO_NUMBER=0}if(m==this.LOAN_TO_VALUE2){this.SCENARIO_NUMBER=1}if(m==this.LOAN_TO_VALUE3){this.SCENARIO_NUMBER=2}}else{a=(this.LOAN_TO_VALUE3<0?3:4);this.LOAN_TO_VALUE=KJE.FloatArray(a);this.LOAN_TO_VALUE[0]=this.LOAN_TO_VALUE1;this.LOAN_TO_VALUE[1]=m;this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE2;if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[3]=this.LOAN_TO_VALUE3}this.SCENARIO_NUMBER=1;if(m<this.LOAN_TO_VALUE1){this.LOAN_TO_VALUE[0]=m;this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE1;this.SCENARIO_NUMBER=0}else{if(m<this.LOAN_TO_VALUE2){}else{if(m<this.LOAN_TO_VALUE3||this.LOAN_TO_VALUE3==-1){this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;this.LOAN_TO_VALUE[2]=m;if(this.LOAN_TO_VALUE3){this.LOAN_TO_VALUE[3]=this.LOAN_TO_VALUE3}this.SCENARIO_NUMBER=2}else{this.LOAN_TO_VALUE[1]=this.LOAN_TO_VALUE2;this.LOAN_TO_VALUE[2]=this.LOAN_TO_VALUE3;this.LOAN_TO_VALUE[3]=m;this.SCENARIO_NUMBER=3}}}}this.MAXIMUM_OF_LOANS_POSSIBLE=KJE.FloatArray(a);this.YOUR_CREDIT_LIMIT=KJE.FloatArray(a);this.DS_CREDITLINES=new Array(a);this.MAX_OF_LOANS=(m*b);var f=this.MAX_OF_LOANS-k;if(f<0){f=0}var o=Math.round(20);var j=4000;var d=4000*o/2;if((b-10000)<((o/2)*j)){}if(l&&!this.NOEDIT_LOAN_TO_VALUE){var g=this.sSchedule;g.clearRepeat();g.addHeader("&nbsp;",g.sReportCol("Maximum Loans",1),g.sReportCol("Current Mortgages",2),g.sReportCol("Credit Line",3))}for(var h=0;h<a;h++){this.MAXIMUM_OF_LOANS_POSSIBLE[h]=b*this.LOAN_TO_VALUE[h];this.YOUR_CREDIT_LIMIT[h]=this.MAXIMUM_OF_LOANS_POSSIBLE[h]-k;this.DS_CREDITLINES[h]=KJE.FloatArray(o);if(this.YOUR_CREDIT_LIMIT[h]<0){this.YOUR_CREDIT_LIMIT[h]=0}if(l&&!this.NOEDIT_LOAN_TO_VALUE){g.addRepeat(this.getL2V(this.LOAN_TO_VALUE[h]),e.dollars(this.MAXIMUM_OF_LOANS_POSSIBLE[h]),e.dollars(k),e.dollars(this.YOUR_CREDIT_LIMIT[h]))}for(var c=0;c<o;c++){this.DS_CREDITLINES[h][c]=((this.LOAN_TO_VALUE[h]*(b+j*c-d))-k);if(this.DS_CREDITLINES[h][c]<0){this.DS_CREDITLINES[h][c]=0}if(c==(o-1)&&this.DS_CREDITLINES[h][c]==0){this.DS_CREDITLINES[h][c]=1}this.cats[c]=e.dollars((b+j*c-d)/KJE.gScaleLabelFactor[this.XAXIS_FACTOR])}}this.NUMBER_OF_SENARIOS=a;this.CREDIT_LIMIT=f};KJE.CreditLineCalc.prototype.formatReport=function(c){var d=KJE;var a=this.iDecimal;var e=c;for(var b=0;b<this.YOUR_CREDIT_LIMIT.length;b++){e=KJE.replace("CREDIT_LIMIT"+(b+1),d.dollars(this.YOUR_CREDIT_LIMIT[b]),e)}e=KJE.replace("APPRAISED_VALUE_OF_YOUR_HOME",d.dollars(this.APPRAISED_VALUE_OF_YOUR_HOME),e);e=KJE.replace("MORTGAGES_YOU_OWE",d.dollars(this.MORTGAGES_YOU_OWE),e);e=KJE.replace("LOAN_TO_VALUE_RATIO",d.percent(this.LOAN_TO_VALUE_RATIO/100,this.LOAN_TO_VALUE_RATIO_DECIMALS),e);e=KJE.replace("LOAN_TO_VALUE1",d.percent(this.LOAN_TO_VALUE1,this.LOAN_TO_VALUE_RATIO_DECIMALS),e);e=KJE.replace("LOAN_TO_VALUE2",d.percent(this.LOAN_TO_VALUE2,this.LOAN_TO_VALUE_RATIO_DECIMALS),e);e=KJE.replace("LOAN_TO_VALUE3",d.percent(this.LOAN_TO_VALUE3,this.LOAN_TO_VALUE_RATIO_DECIMALS),e);e=KJE.replace("CREDIT_LIMIT",d.dollars(this.CREDIT_LIMIT),e);e=KJE.replace("MAX_OF_LOANS",d.dollars(this.MAX_OF_LOANS),e);e=KJE.replace("LOCATION",this.LOCATION,e);e=e.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return e};KJE.CreditLineCalc.prototype.getL2V=function(a){return this.MSG_LEGEND_START+" "+KJE.percent(a,this.LOAN_TO_VALUE_RATIO_DECIMALS)+(this.MSG_LEGEND_END.length>1?" ":"")+this.MSG_LEGEND_END};KJE.CalcName="Home Equity Line of Credit Calculator";KJE.CalcType="creditline";KJE.CalculatorTitleTemplate="You may qualify for a KJE1 credit line.";KJE.parseInputs=function(b){if(KJE.Default.STATE_INDEX){var a=KJE.getDropBox("STATE_LOCATION",KJE.parameters.get("STATE_LOCATION",0),KJE.Default.STATE_INDEX,KJE.Default.STATE_SELECTIONS);b=KJE.replace("**STATE_LOCATION**",a,b)}return b};KJE.initialize=function(){KJE.CalcControl=new KJE.CreditLineCalc();KJE.GuiControl=new KJE.CreditLine(KJE.CalcControl)};KJE.CreditLine=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Appraised value ")+(KJE.gScaleLabel[e.XAXIS_FACTOR]!=""?" ("+KJE.gScaleLabel[e.XAXIS_FACTOR]+KJE.sCurrency+")":"");this.MSG_RESULTS=KJE.parameters.get("MSG_RESULTS","How was this calculated?  Your credit line is based on the amount of debt that can be secured by value of your home. This amount is calculated as the appraised value of your home times the loan to value ratio.");if(KJE.Default.STATE_INDEX){KJE.DropBox("STATE_LOCATION","State of residence");this.MSG_TITLE_CHOOSE=KJE.parameters.set("MSG_TITLE_CHOOSE","Please choose a state to begin")}KJE.DollarSlider("APPRAISED_VALUE_OF_YOUR_HOME","Appraised value of your home",0,10000000);KJE.DollarSlider("MORTGAGES_YOU_OWE","Outstanding home loans",0,10000000);KJE.PercentSlider("LOAN_TO_VALUE_RATIO","Loan to value ratio limit",1,KJE.parameters.get("LOAN_TO_VALUE_RATIO_MAX",200),e.LOAN_TO_VALUE_RATIO_DECIMALS);this.MSG_GRAPH_TITLE=KJE.parameters.get("MSG_GRAPH_TITLE","What if my appraised value changes?");var a=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE);a._legend._iOrientation=(c.TOP_RIGHT);a._titleXAxis.setText(this.MSG_GRAPH1);a._titleYAxis.setText(KJE.parameters.get("MSG_YAXIS_TITLE",""));KJE.addDiv("INPUTS",KJE.colorList[0])};KJE.CreditLine.prototype.setValues=function(c){var a=KJE.inputs.items;c.APPRAISED_VALUE_OF_YOUR_HOME=a.APPRAISED_VALUE_OF_YOUR_HOME.getValue();c.MORTGAGES_YOU_OWE=a.MORTGAGES_YOU_OWE.getValue();if(KJE.Default.STATE_INDEX){var b=a.STATE_LOCATION.getValue();c.LOAN_TO_VALUE_RATIO=KJE.Default.STATE_RATIOS[b];c.LOCATION=KJE.Default.STATE_SELECTIONS[b];if(b==0){KJE.InComplete=true}}else{c.LOAN_TO_VALUE_RATIO=a.LOAN_TO_VALUE_RATIO.getValue()}};KJE.CreditLine.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();if(e.LOAN_TO_VALUE_RATIO==0){KJE.CalculatorTitleShow=this.MSG_TITLE_CHOOSE;a.setTitle(" ")}else{KJE.setTitleTemplate(d.dollars(e.CREDIT_LIMIT));a.setGraphCategories(e.cats);a.setTitle(this.MSG_GRAPH_TITLE);if(e.NOEDIT_LOAN_TO_VALUE){a.add(new KJE.gGraphDataSeries(e.DS_CREDITLINES[e.SCENARIO_NUMBER],e.getL2V(e.LOAN_TO_VALUE[e.SCENARIO_NUMBER]),a.getColor(1)))}else{for(var f=(e.NUMBER_OF_SENARIOS-1);f>=0;f--){a.add(new KJE.gGraphDataSeries(e.DS_CREDITLINES[f],e.getL2V(e.LOAN_TO_VALUE[f]),a.getColor(f+1)))}}if(e.DS_CREDITLINES[e.NUMBER_OF_SENARIOS-1][19]!=1){a._axisY._bAutoMinimum=true;a._axisY._axisMinimum=0;a._axisY._bAutoMaximum=true}else{a._axisY._bAutoMinimum=false;a._axisY._axisMinimum=0;a._axisY._bAutoMaximum=false;a._axisY._axisMaximum=1000}if(KJE.Default.STATE_INDEX){b.LOAN_TO_VALUE_RATIO.setText(d.percent(e.LOAN_TO_VALUE_RATIO/100,e.LOAN_TO_VALUE_RATIO_DECIMALS),true)}}a.paint()};KJE.InputScreenText=" <div id=KJE-D-INPUTS> <div id='KJE-C-APPRAISED_VALUE_OF_YOUR_HOME'><input id='KJE-APPRAISED_VALUE_OF_YOUR_HOME' /></div> <div id='KJE-C-MORTGAGES_YOU_OWE'><input id='KJE-MORTGAGES_YOU_OWE' /></div> <div id='KJE-C-LOAN_TO_VALUE_RATIO'><input id='KJE-LOAN_TO_VALUE_RATIO' /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-APPRAISED_VALUE_OF_YOUR_HOME' ><dt>Appraised value of your home</dt><dd>Current appraised value of your home.</dd></div> <div id='KJE-D-MORTGAGES_YOU_OWE' ><dt>Outstanding home loans</dt><dd>Total amount of all outstanding home loan balances, including your first mortgage, second mortgage(s), and any other debt that is secured by your home.</dd></div> <div id='KJE-D-LOAN_TO_VALUE_RATIO' ><dt>Loan-to-value ratio limit</dt><dd>Loan-to-value ratio limit is the maximum loan-to-value ratio (LTV) your lender will allow. LTV is the percentage of your home's appraised value that is borrowed, including all outstanding mortgages and home equity loans and lines secured by your home. For example, a lender's 80% LTV limit for a home appraised at $400,000 would mean a HELOC applicant could have no more than $320,000 in total outstanding home loan balances. Remember, the $320,000 limit would include all existing loans secured by your home plus your new HELOC.</dd></div> ";KJE.ReportText=' <!--HEADING "Home Equity Line of Credit Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>You may qualify for a CREDIT_LIMIT home equity credit line.</h2> This is based on a maximum debt secured by your home of MAX_OF_LOANS, which is the appraised value of your home times the loan-to-value ratio limit. (APPRAISED_VALUE_OF_YOUR_HOME X LOAN_TO_VALUE_RATIO) **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Maximum debt to be secured by your home </th><td class="KJECellStrong">MAX_OF_LOANS </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Line of credit </th><td class="KJECellStrong">CREDIT_LIMIT</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Appraised value of your home </th><td class="KJECell">APPRAISED_VALUE_OF_YOUR_HOME </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Outstanding home loans </th><td class="KJECell">MORTGAGES_YOU_OWE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan-to-value ratio limit </th><td class="KJECell">LOAN_TO_VALUE_RATIO </td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Credit line available for alternate loan-to-value ratio limits</h2> **REPEATING GROUP** ';
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on data2.profitstarscms.com denmarkstate.com ramseybank.com www.centurybanknet.com foresightbank.com fnb-hartford.com

