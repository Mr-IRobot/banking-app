
KJE.CheckBookCalc=function(){this.cats=new Array(1);this.DS_CHECKS=KJE.FloatArray(1);this.DS_DEPOSITS=KJE.FloatArray(1);this.DS_BALANCE=KJE.FloatArray(1)};KJE.CheckBookCalc.prototype.clear=function(){this.CHECK_1=0;this.CHECK_2=0;this.CHECK_3=0;this.CHECK_4=0;this.CHECK_5=0;this.CHECK_6=0;this.CHECK_7=0;this.CHECK_8=0;this.CHECK_9=0;this.CHECK_10=0;this.DEPOSIT_1=0;this.DEPOSIT_2=0;this.DEPOSIT_3=0;this.DEPOSIT_4=0;this.DEPOSIT_5=0;this.ALL_OTHER_CHECKS=0;this.ALL_OTHER_DEPOSITS=0;this.BALANCE_ON_STATEMENT=0};KJE.CheckBookCalc.prototype.calculate=function(w){var n=KJE;var k=this.CHECK_1;var j=this.CHECK_2;var h=this.CHECK_3;var f=this.CHECK_4;var e=this.CHECK_5;var d=this.CHECK_6;var c=this.CHECK_7;var b=this.CHECK_8;var a=this.CHECK_9;var l=this.CHECK_10;var r=this.DEPOSIT_1;var q=this.DEPOSIT_2;var p=this.DEPOSIT_3;var o=this.DEPOSIT_4;var m=this.DEPOSIT_5;var v=this.ALL_OTHER_CHECKS;var g=this.ALL_OTHER_DEPOSITS;var i=this.BALANCE_ON_STATEMENT;var u=0;var s=0;var t=0;u=k+j+h+f+e+d+c+b+a+l+v;s=r+q+p+o+m+g;t=s+i-u;this.cats[0]="1";this.DS_CHECKS[0]=u;this.DS_DEPOSITS[0]=s;this.DS_BALANCE[0]=t;this.TOTAL_CHECKS_OUTSTANDING=u;this.TOTAL_DEPOSITS_OUTSTANDING=s;this.CHECKBOOK_BALANCE=t};KJE.CheckBookCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("CHECK_10",c.dollars(this.CHECK_10,2),d);d=KJE.replace("CHECK_1",c.dollars(this.CHECK_1,2),d);d=KJE.replace("CHECK_2",c.dollars(this.CHECK_2,2),d);d=KJE.replace("CHECK_3",c.dollars(this.CHECK_3,2),d);d=KJE.replace("CHECK_4",c.dollars(this.CHECK_4,2),d);d=KJE.replace("CHECK_5",c.dollars(this.CHECK_5,2),d);d=KJE.replace("CHECK_6",c.dollars(this.CHECK_6,2),d);d=KJE.replace("CHECK_7",c.dollars(this.CHECK_7,2),d);d=KJE.replace("CHECK_8",c.dollars(this.CHECK_8,2),d);d=KJE.replace("CHECK_9",c.dollars(this.CHECK_9,2),d);d=KJE.replace("DEPOSIT_1",c.dollars(this.DEPOSIT_1,2),d);d=KJE.replace("DEPOSIT_2",c.dollars(this.DEPOSIT_2,2),d);d=KJE.replace("DEPOSIT_3",c.dollars(this.DEPOSIT_3,2),d);d=KJE.replace("DEPOSIT_4",c.dollars(this.DEPOSIT_4,2),d);d=KJE.replace("DEPOSIT_5",c.dollars(this.DEPOSIT_5,2),d);d=KJE.replace("ALL_OTHER_CHECKS",c.dollars(this.ALL_OTHER_CHECKS,2),d);d=KJE.replace("ALL_OTHER_DEPOSITS",c.dollars(this.ALL_OTHER_DEPOSITS,2),d);d=KJE.replace("BALANCE_ON_STATEMENT",c.dollars(this.BALANCE_ON_STATEMENT,2),d);d=KJE.replace("TOTAL_CHECKS_OUTSTANDING",c.dollars(this.TOTAL_CHECKS_OUTSTANDING,2),d);d=KJE.replace("TOTAL_DEPOSITS_OUTSTANDING",c.dollars(this.TOTAL_DEPOSITS_OUTSTANDING,2),d);d=KJE.replace("CHECKBOOK_BALANCE",c.dollars(this.CHECKBOOK_BALANCE,2),d);return d};KJE.CalcName="Checkbook Balancer";KJE.CalcType="checkbook";KJE.CalculatorTitleTemplate="Your checkbook balance is KJE1";KJE.parseInputs=function(a){return a};KJE.initialize=function(){KJE.CalcControl=new KJE.CheckBookCalc();KJE.GuiControl=new KJE.CheckBook(KJE.CalcControl)};KJE.CheckBook=function(j){var e=KJE;var a=KJE.gLegend;var f=KJE.inputs.items;this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Checks");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Deposits");this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance");var m=KJE.parameters.get("MSG_CHECK_LBL","Check");KJE.InputItem.AltHelpName="CHECK";KJE.DollarSlider("CHECK_1",m+" 1",0,1000000,2,1,0);KJE.DollarSlider("CHECK_2",m+" 2",0,1000000,2,1,0);KJE.DollarSlider("CHECK_3",m+" 3",0,1000000,2,1,0);KJE.DollarSlider("CHECK_4",m+" 4",0,1000000,2,1,0);KJE.DollarSlider("CHECK_5",m+" 5",0,1000000,2,1,0);KJE.DollarSlider("CHECK_6",m+" 6",0,1000000,2,1,0);KJE.DollarSlider("CHECK_7",m+" 7",0,1000000,2,1,0);KJE.DollarSlider("CHECK_8",m+" 8",0,1000000,2,1,0);KJE.DollarSlider("CHECK_9",m+" 9",0,1000000,2,1,0);KJE.DollarSlider("CHECK_10",m+" 10",0,1000000,2,1,0);KJE.InputItem.AltHelpName="DEPOSIT";KJE.DollarSlider("DEPOSIT_1","Deposit 1",0,1000000,2,1,0);KJE.DollarSlider("DEPOSIT_2","Deposit 2",0,1000000,2,1,0);KJE.DollarSlider("DEPOSIT_3","Deposit 3",0,1000000,2,1,0);KJE.DollarSlider("DEPOSIT_4","Deposit 4",0,1000000,2,1,0);KJE.DollarSlider("DEPOSIT_5","Deposit 5",0,1000000,2,1,0);KJE.InputItem.AltHelpName=null;KJE.DollarSlider("ALL_OTHER_CHECKS","Other checks",0,1000000,2,1,0);KJE.DollarSlider("ALL_OTHER_DEPOSITS","Other deposits",0,1000000,2,1,0);KJE.DollarSlider("BALANCE_ON_STATEMENT","Balance on statement",0,1000000,2,1,0);KJE.Label("TOTAL_CHECKS_OUTSTANDING","Total outstanding checks",null,null,"KJEBold");KJE.Label("TOTAL_DEPOSITS_OUTSTANDING","Total outstanding deposits",null,null,"KJEBold");var g=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_LABEL2","Checkbook Balance"));g._legend._iOrientation=(a.TOP_RIGHT);g._axisX.setVisible(false);g._showItemLabel=true;g._bPopDetail=true;KJE.addDiv("INPUTS",KJE.colorList[0]);var i=KJE.parameters.get("MSG_DROPPER_CHECKS","Outstanding checks:");var k=KJE.parameters.get("MSG_DROPPER_CLOSECHECKS","KJE1");var d=function(){return i+"|"+KJE.subText(KJE.getKJEReplaced(k,e.dollars(j.TOTAL_CHECKS_OUTSTANDING)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("CHECKS",false,i,d),KJE.colorList[0]);var b=KJE.parameters.get("MSG_DROPPER_DEPOSIT","Outstanding deposits:");var c=KJE.parameters.get("MSG_DROPPER_CLOSEDEPOSIT","KJE1");var h=function(){return b+"|"+KJE.subText(KJE.getKJEReplaced(c,e.dollars(j.TOTAL_DEPOSITS_OUTSTANDING)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("DEPOSITS",false,b,h),KJE.colorList[0])};KJE.CheckBook.prototype.setValues=function(b){var a=KJE.inputs.items;b.CHECK_1=a.CHECK_1.getValue();b.CHECK_2=a.CHECK_2.getValue();b.CHECK_3=a.CHECK_3.getValue();b.CHECK_4=a.CHECK_4.getValue();b.CHECK_5=a.CHECK_5.getValue();b.CHECK_6=a.CHECK_6.getValue();b.CHECK_7=a.CHECK_7.getValue();b.CHECK_8=a.CHECK_8.getValue();b.CHECK_9=a.CHECK_9.getValue();b.CHECK_10=a.CHECK_10.getValue();b.DEPOSIT_1=a.DEPOSIT_1.getValue();b.DEPOSIT_2=a.DEPOSIT_2.getValue();b.DEPOSIT_3=a.DEPOSIT_3.getValue();b.DEPOSIT_4=a.DEPOSIT_4.getValue();b.DEPOSIT_5=a.DEPOSIT_5.getValue();b.ALL_OTHER_CHECKS=a.ALL_OTHER_CHECKS.getValue();b.ALL_OTHER_DEPOSITS=a.ALL_OTHER_DEPOSITS.getValue();b.BALANCE_ON_STATEMENT=a.BALANCE_ON_STATEMENT.getValue()};KJE.CheckBook.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(d.dollars(e.CHECKBOOK_BALANCE,2));a.removeAll();a.setGraphCategories(e.cats);a.add(new KJE.gGraphDataSeries(e.DS_CHECKS,this.MSG_GRAPH1+" "+d.dollars(e.TOTAL_CHECKS_OUTSTANDING,2),a.getColor(1)));a.add(new KJE.gGraphDataSeries(e.DS_DEPOSITS,this.MSG_GRAPH2+" "+d.dollars(e.TOTAL_DEPOSITS_OUTSTANDING,2),a.getColor(2)));a.add(new KJE.gGraphDataSeries(e.DS_BALANCE,this.MSG_GRAPH3+" "+d.dollars(e.CHECKBOOK_BALANCE,2),a.getColor(3)));if(e.CHECKBOOK_BALANCE<0){a._axisY._bAutoMinimum=true}else{a._axisY._bAutoMinimum=false}a.paint();b.TOTAL_CHECKS_OUTSTANDING.setText(d.dollars(e.TOTAL_CHECKS_OUTSTANDING,2));b.TOTAL_DEPOSITS_OUTSTANDING.setText(d.dollars(e.TOTAL_DEPOSITS_OUTSTANDING,2))};KJE.InputScreenText=" <div id=KJE-D-INPUTS> <div id='KJE-C-BALANCE_ON_STATEMENT'><input id='KJE-BALANCE_ON_STATEMENT' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-CHECKS><div id=KJE-P-CHECKS>Input information:</div></div> <div id=KJE-E-CHECKS > <div id='KJE-C-CHECK_1'><input id='KJE-CHECK_1'/></div> <div id='KJE-C-CHECK_2'><input id='KJE-CHECK_2' /></div> <div id='KJE-C-CHECK_3'><input id='KJE-CHECK_3' /></div> <div id='KJE-C-CHECK_4'><input id='KJE-CHECK_4' /></div> <div id='KJE-C-CHECK_5'><input id='KJE-CHECK_5' /></div> <div id='KJE-C-CHECK_6'><input id='KJE-CHECK_6' /></div> <div id='KJE-C-CHECK_7'><input id='KJE-CHECK_7' /></div> <div id='KJE-C-CHECK_8'><input id='KJE-CHECK_8' /></div> <div id='KJE-C-CHECK_9'><input id='KJE-CHECK_9' /></div> <div id='KJE-C-CHECK_10'><input id='KJE-CHECK_10' /></div> <div id='KJE-C-ALL_OTHER_CHECKS'><input id='KJE-ALL_OTHER_CHECKS' /></div> <div id='KJE-C-TOTAL_CHECKS_OUTSTANDING'><div id='KJE-TOTAL_CHECKS_OUTSTANDING'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-DEPOSITS><div id=KJE-P-DEPOSITS>Input information:</div></div> <div id=KJE-E-DEPOSITS > <div id='KJE-C-DEPOSIT_1'><input id='KJE-DEPOSIT_1' /></div> <div id='KJE-C-DEPOSIT_2'><input id='KJE-DEPOSIT_2' /></div> <div id='KJE-C-DEPOSIT_3'><input id='KJE-DEPOSIT_3' /></div> <div id='KJE-C-DEPOSIT_4'><input id='KJE-DEPOSIT_4' /></div> <div id='KJE-C-DEPOSIT_5'><input id='KJE-DEPOSIT_5' /></div> <div id='KJE-C-ALL_OTHER_DEPOSITS'><input id='KJE-ALL_OTHER_DEPOSITS' /></div> <div id='KJE-C-TOTAL_DEPOSITS_OUTSTANDING'><div id='KJE-TOTAL_DEPOSITS_OUTSTANDING'></div></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-BALANCE_ON_STATEMENT' ><dt>Balance on statement</dt><dd>Your ending account balance as it appears on your statement.</dd></div> <div id='KJE-D-CHECK' ><dt>Checks</dt><dd>Up to 10 checks written or other withdrawals you have made that do not yet appear on your statement. Be sure to include your ATM withdrawals.</dd></div> <div id='KJE-D-DEPOSIT' ><dt>Deposits</dt><dd>Up to five deposits made that do not yet appear on your statement. Be sure to include your ATM deposits.</dd></div> <div id='KJE-D-ALL_OTHER_CHECKS' ><dt>Other checks</dt><dd>Total of all other checks you have written that do not appear on your statement.</dd></div> <div id='KJE-D-ALL_OTHER_DEPOSITS' ><dt>Other deposits</dt><dd>Total of all other deposits you have made that do not appear in your statement.</dd></div> <div id='KJE-D-TOTAL_CHECKS_OUTSTANDING' ><dt>Total checks outstanding</dt><dd>Total amount of all checks not included on your statement.</dd></div> <div id='KJE-D-TOTAL_DEPOSITS_OUTSTANDING' ><dt>Total deposits outstanding</dt><dd>Total amount of all deposits not included on your statement.</dd></div> ";KJE.ReportText=' <!--HEADING "Checkbook Balance Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Your checkbook balance is CHECKBOOK_BALANCE.</h2> **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Outstanding Checks</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Check 1</th><td class="KJECell KJECell40">CHECK_1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 2</th><td class="KJECell ">CHECK_2</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 3</th><td class="KJECell ">CHECK_3</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 4</th><td class="KJECell ">CHECK_4</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 5</th><td class="KJECell ">CHECK_5</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 6</th><td class="KJECell ">CHECK_6</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 7</th><td class="KJECell ">CHECK_7</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 8</th><td class="KJECell ">CHECK_8</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 9</th><td class="KJECell ">CHECK_9</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Check 10</th><td class="KJECell ">CHECK_10</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>All other checks</th><td class="KJECell ">ALL_OTHER_CHECKS</td></tr> </tbody> </table></div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Outstanding Deposits</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Deposit 1</th><td class="KJECell KJECell40">DEPOSIT_1</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Deposit 2</th><td class="KJECell ">DEPOSIT_2</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Deposit 3</th><td class="KJECell ">DEPOSIT_3</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Deposit 4</th><td class="KJECell ">DEPOSIT_4</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Deposit 5</th><td class="KJECell ">DEPOSIT_5</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>All other deposits</th><td class="KJECell ">ALL_OTHER_DEPOSITS</td></tr> </tbody> </table></div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Checkbook Balance Calculation</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Checkbook Balance</th><td class="KJELabel">=CHECKBOOK_BALANCE</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Balance on statement</th><td class="KJELabel KJECell40">+BALANCE_ON_STATEMENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total checks outstanding</th><td class="KJELabel">-TOTAL_CHECKS_OUTSTANDING</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total deposits outstanding</th><td class="KJELabel">+TOTAL_DEPOSITS_OUTSTANDING</td></tr> </tbody> </table> </div> ';
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on data2.profitstarscms.com denmarkstate.com ramseybank.com www.centurybanknet.com foresightbank.com fnb-hartford.com

