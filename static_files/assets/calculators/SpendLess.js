
KJE.SpendLessCalc=function(){this.STARTING_BALANCE=0;this.MONTHLY_SAVINGS=0;this.DS_SAVINGS=null;this.DS_TAXABLE=null;this.cats=null;this.sSchedule=new KJE.Repeating()};KJE.SpendLessCalc.prototype.clear=function(){this.RATE_OF_RETURN=0;this.YEARS_OF_SAVING=0;this.MARGINAL_TAX_RATE=0;this.FEDERAL_TAX_RATE=0;this.STATE_TAX_RATE=0;this.EAT_OUT_LESS=0;this.FEWER_VACTIONS=0;this.FEWER_MOVIES=0;this.OTHER_ENTERTAINMENT=0;this.CLIP_COUPONS=0;this.PAYOFF_CREDIT_CARDS=0;this.WAIT_FOR_NEW_CAR=0;this.OTHER_BUDGET=0;this.DISCONNECT_CABLE_TV=0;this.ELIMINATE_CELL_PHONE=0;this.REDUCE_LONG_DISTANCE=0;this.OTHER_UTILITY=0};KJE.SpendLessCalc.prototype.calculate=function(C){var g=KJE;var d=this.RATE_OF_RETURN;var e=this.YEARS_OF_SAVING;var z=this.MARGINAL_TAX_RATE;var B=this.FEDERAL_TAX_RATE;var a=this.STATE_TAX_RATE;var c=this.EAT_OUT_LESS;var v=this.FEWER_VACTIONS;var A=this.FEWER_MOVIES;var E=this.OTHER_ENTERTAINMENT;var D=this.CLIP_COUPONS;var f=this.PAYOFF_CREDIT_CARDS;var w=this.WAIT_FOR_NEW_CAR;var l=this.OTHER_BUDGET;var o=this.DISCONNECT_CABLE_TV;var u=this.ELIMINATE_CELL_PHONE;var r=this.REDUCE_LONG_DISTANCE;var k=this.OTHER_UTILITY;this.STARTING_BALANCE=0;this.MONTHLY_UTILITY=o+u+r+k;this.MONTHLY_ENTERTAINMENT=c+v+A+E;this.MONTHLY_BUDGET=D+f+w+l;this.MONTHLY_SAVINGS=c+v+A+E+D+f+w+l+o+u+r+k;if(z==0){z=B+a}var m=this.MONTHLY_SAVINGS*e*12;var y=d/100;var t=KJE.ROR_MONTH(y);var b=KJE.FV_AMT(t,e*12,this.STARTING_BALANCE)+KJE.FV_BEGIN(t,e*12,this.MONTHLY_SAVINGS);var q=(t)*(1-z/100);var j=KJE.FV_AMT(q,e*12,this.STARTING_BALANCE)+KJE.FV_BEGIN(q,e*12,this.MONTHLY_SAVINGS);var p=Math.round(e);var x=0;this.DS_SAVINGS=KJE.FloatArray(p);this.DS_TAXABLE=KJE.FloatArray(p);this.cats=new Array(p);if(C){var h=this.sSchedule;h.clearRepeat();h.addHeader(h.sReportCol("Year",1),(KJE.bHT?h.sReportCol("Total Savings",2):h.sReportCol("Savings Before Taxes",2)),(KJE.bHT?null:h.sReportCol("Savings After Taxes",3)))}for(var s=1;s<=p;s++){x=s-1;this.cats[x]=g.number(s,0);this.DS_SAVINGS[x]=Math.round(KJE.FV_AMT(t,s*12,this.STARTING_BALANCE)+KJE.FV_BEGIN(t,s*12,this.MONTHLY_SAVINGS));this.DS_TAXABLE[x]=Math.round(KJE.FV_AMT(q,s*12,this.STARTING_BALANCE)+KJE.FV_BEGIN(q,s*12,this.MONTHLY_SAVINGS));if(C){h.addRepeat(g.number(s,0),g.dollars(this.DS_SAVINGS[x]),(KJE.bHT?null:g.dollars(this.DS_TAXABLE[x])))}}this.ROR_PERCENT=y;this.TAX_DEFERRED_TOTAL=b;this.AFTER_TAX_ROR_PERCENT=q;this.SAVINGS_TOTAL=j;this.TOTAL_CONTRIBUTIONS=m;this.ROR_MONTHLY=t;this.MARGINAL_TAX_RATE=z};KJE.SpendLessCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("STARTING_BALANCE",c.number(this.STARTING_BALANCE,0),d);d=KJE.replace("MONTHLY_SAVINGS",c.dollars(this.MONTHLY_SAVINGS,0),d);d=KJE.replace("RATE_OF_RETURN",c.percent(this.RATE_OF_RETURN/100,2),d);d=KJE.replace("YEARS_OF_SAVING",c.number(this.YEARS_OF_SAVING,0),d);d=KJE.replace("MARGINAL_TAX_RATE",c.percent(this.MARGINAL_TAX_RATE/100,1),d);d=KJE.replace("FEDERAL_TAX_RATE",c.percent(this.FEDERAL_TAX_RATE/100,1),d);d=KJE.replace("STATE_TAX_RATE",c.percent(this.STATE_TAX_RATE/100,1),d);d=KJE.replace("TAX_DEFERRED_TOTAL",c.dollars(this.TAX_DEFERRED_TOTAL,0),d);d=KJE.replace("SAVINGS_TOTAL",c.dollars(this.SAVINGS_TOTAL,0),d);d=KJE.replace("ROR_PERCENT",c.percent(this.ROR_PERCENT,2),d);d=KJE.replace("DIFFERENCE_AT_RETIRE",c.dollars(this.TAX_DEFERRED_TOTAL-this.SAVINGS_TOTAL),d);d=KJE.replace("TOTAL_CONTRIBUTIONS",c.dollars(this.TOTAL_CONTRIBUTIONS),d);d=KJE.replace("EAT_OUT_LESS",c.dollars(this.EAT_OUT_LESS),d);d=KJE.replace("FEWER_VACTIONS",c.dollars(this.FEWER_VACTIONS),d);d=KJE.replace("FEWER_MOVIES",c.dollars(this.FEWER_MOVIES),d);d=KJE.replace("OTHER_ENTERTAINMENT",c.dollars(this.OTHER_ENTERTAINMENT),d);d=KJE.replace("CLIP_COUPONS",c.dollars(this.CLIP_COUPONS),d);d=KJE.replace("PAYOFF_CREDIT_CARDS",c.dollars(this.PAYOFF_CREDIT_CARDS),d);d=KJE.replace("WAIT_FOR_NEW_CAR",c.dollars(this.WAIT_FOR_NEW_CAR),d);d=KJE.replace("OTHER_BUDGET",c.dollars(this.OTHER_BUDGET),d);d=KJE.replace("DISCONNECT_CABLE_TV",c.dollars(this.DISCONNECT_CABLE_TV),d);d=KJE.replace("ELIMINATE_CELL_PHONE",c.dollars(this.ELIMINATE_CELL_PHONE),d);d=KJE.replace("REDUCE_LONG_DISTANCE",c.dollars(this.REDUCE_LONG_DISTANCE),d);d=KJE.replace("OTHER_UTILITY",c.dollars(this.OTHER_UTILITY),d);d=KJE.replace("MONTHLY_UTILITY",c.dollars(this.MONTHLY_UTILITY),d);d=KJE.replace("MONTHLY_BUDGET",c.dollars(this.MONTHLY_BUDGET),d);d=KJE.replace("MONTHLY_ENTERTAINMENT",c.dollars(this.MONTHLY_ENTERTAINMENT),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.CalcName="Benefit of Spending Less Calculator";KJE.CalcType="SpendLess";KJE.CalculatorTitleTemplate="Spending KJE3 less per month adds up to KJE2 in KJE1 years.";KJE.parseInputs=function(a){return a};KJE.initialize=function(){KJE.CalcControl=new KJE.SpendLessCalc();KJE.GuiControl=new KJE.SpendLess(KJE.CalcControl)};KJE.SpendLess=function(q){var h=KJE;var b=KJE.gLegend;var j=KJE.inputs.items;this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Total before taxes");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Total after taxes");this.MSG_WINDOW_LBL=KJE.parameters.get("MSG_WINDOW_LBL","Monthly spending decreased by");KJE.DollarSlider("STARTING_BALANCE","Starting balance",0,500000,0);KJE.InvestRateSlider("RATE_OF_RETURN","Annual rate of return");KJE.NumberSlider("YEARS_OF_SAVING","Years to save",1,100,0);KJE.PercentSlider("FEDERAL_TAX_RATE","Federal tax rate",0,50,1);KJE.PercentSlider("STATE_TAX_RATE","State tax rate",0,50,1);KJE.DollarSlider("EAT_OUT_LESS","Eat out less",0,1000,0);KJE.DollarSlider("FEWER_VACTIONS","Fewer vacations",0,5000,0);KJE.DollarSlider("FEWER_MOVIES","Fewer movies",0,1000,0);KJE.DollarSlider("OTHER_ENTERTAINMENT","Other entertainment savings",0,5000,0);KJE.DollarSlider("CLIP_COUPONS","Clip coupons",0,240,0,5);KJE.DollarSlider("PAYOFF_CREDIT_CARDS","Pay off credit cards",0,5000,0);KJE.DollarSlider("WAIT_FOR_NEW_CAR","Wait to purchase new car",0,1000,0);KJE.DollarSlider("OTHER_BUDGET","Other budget savings",0,5000,0);KJE.DollarSlider("DISCONNECT_CABLE_TV","Disconnect cable TV",0,240,0,5);KJE.DollarSlider("ELIMINATE_CELL_PHONE","Eliminate cell phone",0,240,0,5);KJE.DollarSlider("REDUCE_LONG_DISTANCE","Reduce long distance costs",0,240,0,5);KJE.DollarSlider("OTHER_UTILITY","Other utility savings",0,240,0,5);KJE.InputItem.AltHelpName="MONTHLY_SAVINGS";KJE.Label("MONTHLY_UTILITY","Monthly savings",null,null,"KJEBold");KJE.Label("MONTHLY_BUDGET","Monthly savings",null,null,"KJEBold");KJE.Label("MONTHLY_ENTERTAINMENT","Monthly savings",null,null,"KJEBold");KJE.InputItem.AltHelpName="null";var k=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Savings Total by Year"));k._legend.setVisible(!KJE.bHT);k._legend._iOrientation=(b.BOTTOM);k._showItemLabelOnTop=true;var a=KJE.parameters.get("MSG_DROPPER_TITLE","Your investment options:");var i=function(){return a+KJE.subText(KJE.shortDesc(j.RATE_OF_RETURN,j.YEARS_OF_SAVING),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",true,a,i),KJE.colorList[0]);var g=KJE.parameters.get("MSG_DROPPER_ENTERTAINMENT","Entertainment savings:");var p=KJE.parameters.get("MSG_DROPPER_CLOSEENTERTAINMENT","KJE1 per month");var n=function(){return g+"|"+KJE.subText(KJE.getKJEReplaced(p,KJE.dollars(q.MONTHLY_ENTERTAINMENT)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("ENTERTAINMENT",false,g,n),KJE.colorList[0]);var d=KJE.parameters.get("MSG_DROPPER_UTILITY","Utility savings:");var f=KJE.parameters.get("MSG_DROPPER_CLOSEUTILITY","KJE1 per month");var c=function(){return d+"|"+KJE.subText(KJE.getKJEReplaced(f,KJE.dollars(q.MONTHLY_UTILITY)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("UTILITY",false,d,c),KJE.colorList[0]);var e=KJE.parameters.get("MSG_DROPPER_BUDGET","Budget savings:");var m=KJE.parameters.get("MSG_DROPPER_CLOSEBUDGET","KJE1 per month");var o=function(){return e+"|"+KJE.subText(KJE.getKJEReplaced(m,KJE.dollars(q.MONTHLY_BUDGET)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("BUDGET",false,e,o),KJE.colorList[0])};KJE.SpendLess.prototype.setValues=function(b){var a=KJE.inputs.items;b.FEDERAL_TAX_RATE=a.FEDERAL_TAX_RATE.getValue();b.STATE_TAX_RATE=a.STATE_TAX_RATE.getValue();b.RATE_OF_RETURN=a.RATE_OF_RETURN.getValue();b.YEARS_OF_SAVING=a.YEARS_OF_SAVING.getValue();b.EAT_OUT_LESS=a.EAT_OUT_LESS.getValue();b.FEWER_VACTIONS=a.FEWER_VACTIONS.getValue();b.FEWER_MOVIES=a.FEWER_MOVIES.getValue();b.OTHER_ENTERTAINMENT=a.OTHER_ENTERTAINMENT.getValue();b.CLIP_COUPONS=a.CLIP_COUPONS.getValue();b.PAYOFF_CREDIT_CARDS=a.PAYOFF_CREDIT_CARDS.getValue();b.WAIT_FOR_NEW_CAR=a.WAIT_FOR_NEW_CAR.getValue();b.OTHER_BUDGET=a.OTHER_BUDGET.getValue();b.DISCONNECT_CABLE_TV=a.DISCONNECT_CABLE_TV.getValue();b.ELIMINATE_CELL_PHONE=a.ELIMINATE_CELL_PHONE.getValue();b.REDUCE_LONG_DISTANCE=a.REDUCE_LONG_DISTANCE.getValue();b.OTHER_UTILITY=a.OTHER_UTILITY.getValue()};KJE.SpendLess.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(d.number(e.YEARS_OF_SAVING),d.dollars(e.TAX_DEFERRED_TOTAL),d.dollars(e.MONTHLY_SAVINGS));a.removeAll();a.setGraphCategories(e.cats);if(e.DS_SAVINGS.length>2){a._showItemLabel=false}else{a._showItemLabel=true}a.add(new KJE.gGraphDataSeries(e.DS_SAVINGS,this.MSG_GRAPH1+" "+d.dollars(e.TAX_DEFERRED_TOTAL,0),a.getColor(1)));if(!KJE.bHT){a.add(new KJE.gGraphDataSeries(e.DS_TAXABLE,this.MSG_GRAPH2+" "+d.dollars(e.SAVINGS_TOTAL,0),a.getColor(2)))}a.paint();b.MONTHLY_UTILITY.setText(d.dollars(e.MONTHLY_UTILITY));b.MONTHLY_BUDGET.setText(d.dollars(e.MONTHLY_BUDGET,0));b.MONTHLY_ENTERTAINMENT.setText(d.dollars(e.MONTHLY_ENTERTAINMENT,0))};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-YEARS_OF_SAVING'><input id='KJE-YEARS_OF_SAVING' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div id='KJE-C-FEDERAL_TAX_RATE'><input id='KJE-FEDERAL_TAX_RATE' /></div> <div id='KJE-C-STATE_TAX_RATE'><input id='KJE-STATE_TAX_RATE' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-ENTERTAINMENT><div id=KJE-P-ENTERTAINMENT>Input information:</div></div> <div id=KJE-E-ENTERTAINMENT > <div id='KJE-C-EAT_OUT_LESS'><input id='KJE-EAT_OUT_LESS' /></div> <div id='KJE-C-FEWER_MOVIES'><input id='KJE-FEWER_MOVIES' /></div> <div id='KJE-C-FEWER_VACTIONS'><input id='KJE-FEWER_VACTIONS' /></div> <div id='KJE-C-OTHER_ENTERTAINMENT'><input id='KJE-OTHER_ENTERTAINMENT' /></div> <div id='KJE-C-MONTHLY_ENTERTAINMENT'><div id='KJE-MONTHLY_ENTERTAINMENT'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-BUDGET><div id=KJE-P-BUDGET>Input information:</div></div> <div id=KJE-E-BUDGET > <div id='KJE-C-CLIP_COUPONS'><input id='KJE-CLIP_COUPONS' /></div> <div id='KJE-C-WAIT_FOR_NEW_CAR'><input id='KJE-WAIT_FOR_NEW_CAR' /></div> <div id='KJE-C-PAYOFF_CREDIT_CARDS'><input id='KJE-PAYOFF_CREDIT_CARDS' /></div> <div id='KJE-C-OTHER_BUDGET'><input id='KJE-OTHER_BUDGET' /></div> <div id='KJE-C-MONTHLY_BUDGET'><div id='KJE-MONTHLY_BUDGET'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-UTILITY><div id=KJE-P-UTILITY>Input information:</div></div> <div id=KJE-E-UTILITY > <div id='KJE-C-DISCONNECT_CABLE_TV'><input id='KJE-DISCONNECT_CABLE_TV' /></div> <div id='KJE-C-ELIMINATE_CELL_PHONE'><input id='KJE-ELIMINATE_CELL_PHONE' /></div> <div id='KJE-C-REDUCE_LONG_DISTANCE'><input id='KJE-REDUCE_LONG_DISTANCE' /></div> <div id='KJE-C-OTHER_UTILITY'><input id='KJE-OTHER_UTILITY' /></div> <div id='KJE-C-MONTHLY_UTILITY'><div id='KJE-MONTHLY_UTILITY'></div></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-MONTHLY_SAVINGS' ><dt>Monthly savings</dt><dd>The total amount that you could invest per month by spending less. This amount is calculated by adding up your potential entertainment, budget and utility savings.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Annual rate of return</dt><dd>This is the annually compounded rate of return you expect from your investments. **ROR_DEFINITION**</dd></div> <div id='KJE-D-YEARS_OF_SAVING' ><dt>Years to save</dt><dd>The total number of years you plan to save. <!--STARTHIDETAXES--></dd></div> <div id='KJE-D-FEDERAL_TAX_RATE' ><dt>Federal tax rate</dt><dd>The federal tax rate you expect to pay on your taxable investments.</dd></div> <div id='KJE-D-STATE_TAX_RATE' ><dt>State tax rate</dt><dd>The state tax rate you expect to pay on your taxable investments.</dd></div> <div><dt>Total savings before taxes</dt><dd>Total value of your savings before taxes are taken into account. Most regular savings accounts and investment accounts are taxable. However, if your savings is being invested into a tax-deferred or tax-free investment this total may be important to you.</dd></div> <div><dt>Total savings after taxes</dt><dd>The total amount you would have accumulated in a taxable account. All taxes are assumed to be paid as your earnings accrue. <!--ENDHIDETAXES--></dd></div> ";KJE.ReportText=' <!--HEADING "Spending Less Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Spending MONTHLY_SAVINGS less per month adds up to TAX_DEFERRED_TOTAL in YEARS_OF_SAVING years.</h2>By spending MONTHLY_SAVINGS less per month and investing that amount at RATE_OF_RETURN you could save TAX_DEFERRED_TOTAL before taxes in YEARS_OF_SAVING years.<!--STARTHIDETAXES--> If you pay taxes on your savings, this amount would be reduced to SAVINGS_TOTAL with a combined state and federal marginal tax rate of MARGINAL_TAX_RATE.<!--ENDHIDETAXES--> **GRAPH** <h2 class=\'KJEReportHeader KJEFontHeading\'>Results summary</h2> <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Totals</caption> <!--STARTHIDETAXES--><tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Total savings after taxes</th><td class="KJELabel" >SAVINGS_TOTAL</td></tr> </tfoot><!--ENDHIDETAXES--> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Monthly savings (from spending less)</th><td class="KJECellStrong KJECell40" >MONTHLY_SAVINGS</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total savings <!--STARTHIDETAXES-->before taxes (or tax-deferred)<!--ENDHIDETAXES--></th><td class="KJECellStrong" >TAX_DEFERRED_TOTAL</td></tr> </tbody> </table></div> <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Your investment options:</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Monthly savings</th><td class="KJECell KJECell40" >MONTHLY_SAVINGS</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Years to save</th><td class="KJECell" >YEARS_OF_SAVING</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Rate of return</th><td class="KJECell" >RATE_OF_RETURN</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Federal tax rate</th><td class="KJECell" >FEDERAL_TAX_RATE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>State tax rate</th><td class="KJECell" >STATE_TAX_RATE</td></tr><!--ENDHIDETAXES--> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total contributions over YEARS_OF_SAVING years</th><td class="KJECell" >TOTAL_CONTRIBUTIONS</td></tr><!--STARTHIDETAXES--> </tbody> </table></div> <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Entertainment expenses:</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Eat out less</th><td class="KJECell KJECell40" >EAT_OUT_LESS</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Fewer vacations</th><td class="KJECell" >FEWER_VACTIONS</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Fewer movies</th><td class="KJECell" >FEWER_MOVIES</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other entertainment savings</th><td class="KJECell" >OTHER_ENTERTAINMENT</td></tr> </tbody> </table></div> <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Budget expenses:</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Clip coupons</th><td class="KJECell KJECell40" >CLIP_COUPONS</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Pay off credit cards</th><td class="KJECell" >PAYOFF_CREDIT_CARDS</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Wait to purchase new car</th><td class="KJECell" >WAIT_FOR_NEW_CAR</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other budget savings</th><td class="KJECell" >OTHER_BUDGET</td></tr> </tbody> </table></div> <div class=KJEReportTableDiv> <table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Utility expenses:</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Disconnect cable TV</th><td class="KJECell KJECell40" >DISCONNECT_CABLE_TV</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Eliminate cell phone</th><td class="KJECell" >ELIMINATE_CELL_PHONE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Reduce long distance costs</th><td class="KJECell" >REDUCE_LONG_DISTANCE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other utility savings</th><td class="KJECell" >OTHER_UTILITY</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Savings balances by year</h2> **REPEATING GROUP** ';
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on data2.profitstarscms.com denmarkstate.com ramseybank.com www.centurybanknet.com foresightbank.com fnb-hartford.com

