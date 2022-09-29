
KJE.ShouldIRefiCalc=function(){this.PMI_CALCULATE=KJE.parameters.get("PMI_CALCULATE",false);this.PMI_RATE=KJE.parameters.get("PMI_RATE",0.5);this.MONTHLY_PMI=KJE.parameters.getSet("MONTHLY_PMI",0);this.PMI_PERCENTAGE=KJE.parameters.get("PMI_PERCENTAGE",0.2);this.oldLOAN_AMOUNT=0;this.oldDOWNPAYMENT_20=0;this.oldNEW_BALANCE=0;this.oldNEWAPPRAISED_20=0;this.DOWNPAYMENT=0;this.PURCHASE_PRICE=0;this.MSG_INCREASE1=KJE.parameters.get("MSG_INCREASE1","increase INTEREST_AMT_SAVINGS");this.MSG_DECREASE1=KJE.parameters.get("MSG_DECREASE1","decrease INTEREST_AMT_SAVINGS");this.MSG_INCREASE2=KJE.parameters.get("MSG_INCREASE2","save INTEREST_AMT_SAVINGS in interest");this.MSG_DECREASE2=KJE.parameters.get("MSG_DECREASE2","pay INTEREST_AMT_SAVINGS more in interest");this.MSG_INCREASE3=KJE.parameters.get("MSG_INCREASE3","increase MONTHLY_AMT_SAVINGS");this.MSG_DECREASE3=KJE.parameters.get("MSG_DECREASE3","decrease MONTHLY_AMT_SAVINGS");this.MSG_TITLE="";this.MSG_TITLE_INCREASE=KJE.parameters.get("MSG_TITLE_INCREASE","You could save INTEREST_AMT_SAVINGS in interest");this.MSG_TITLE_DECREASE=KJE.parameters.get("MSG_TITLE_DECREASE","You could pay INTEREST_AMT_SAVINGS more in interest.");this.MSG_BREAK_EVEN1=KJE.parameters.get("MSG_BREAK_EVEN1","With a monthly payment increase, there is no payment break even point.");this.MSG_BREAK_EVEN2=KJE.parameters.get("MSG_BREAK_EVEN2","Refinancing will break even in YOU_WILL_BREAK_EVEN_IN months.");this.MSG_BREAK_EVEN_IMMEDIATE=KJE.parameters.get("MSG_BREAK_EVEN_IMMEDIATE","Refinancing will save you money with the first payment.");this.DS_PAYMENTS=KJE.FloatArray(2);this.DS_INTEREST=KJE.FloatArray(2);this.cats=["Current Mortgage","New Mortgage"];this.cats[0]=KJE.parameters.get("MSG_CAT1",this.cats[0]);this.cats[1]=KJE.parameters.get("MSG_CAT2",this.cats[1]);this.catlabel=["Current Payment (PITI)","New Payment (PITI)"];this.catlabel[0]=KJE.parameters.get("MSG_CATLABEL1",this.catlabel[0]);this.catlabel[1]=KJE.parameters.get("MSG_CATLABEL2",this.catlabel[1]);this.sSchedule=new KJE.Repeating();this.sSchedule2=new KJE.Repeating()};KJE.ShouldIRefiCalc.prototype.clear=function(){this.APPRAISED_HOME_VALUE=0;this.ORIGINAL_LOAN_AMOUNT=0;this.ORIGINAL_RATE=0;this.ORIGINAL_TERM_IN_YEARS=0;this.NUMBER_OF_PAYMENTS_MADE=0;this.ANNUAL_PROPERTY_TAXES=0;this.ANNUAL_HOME_INSURANCE=0;this.MONTHLY_PMI=0;this.NEW_RATE=0;this.NEW_TERM=0;this.CLOSING_COSTS=0};KJE.ShouldIRefiCalc.prototype.calculate=function(I){var c=KJE;var v=this.APPRAISED_HOME_VALUE;var x=this.ORIGINAL_LOAN_AMOUNT;var H=this.ORIGINAL_RATE;var P=this.ORIGINAL_TERM_IN_YEARS;var u=this.NUMBER_OF_PAYMENTS_MADE;var k=this.ANNUAL_PROPERTY_TAXES;var L=this.ANNUAL_HOME_INSURANCE;var F=this.MONTHLY_PMI;var h=this.NEW_RATE;var e=this.NEW_TERM;var V=0;var l=this.CLOSING_COSTS;if(KJE.ShouldIRefiCalc.getTerm){V=KJE.ShouldIRefiCalc.getTerm(this);e=0}if(KJE.ShouldIRefiCalc.getRate){h=KJE.ShouldIRefiCalc.getRate(this)}var g=0;var r=0;var f="";var S=this.DOWNPAYMENT;var t=this.PURCHASE_PRICE;if(t==0&&!this.PMI_CALCULATE){t=x}else{x=t-S;if(x<0){x=0}}this.MONTH_PMI_EXEMPT=false;var m=this.PURCHASE_PRICE*this.PMI_PERCENTAGE;if(this.PMI_CALCULATE&&(m!=this.oldDOWNPAYMENT_20||x!=this.oldLOAN_AMOUNT)){if(m>this.DOWNPAYMENT){F=x*(this.PMI_RATE/1200)}else{F=0;this.MONTH_PMI_EXEMPT=true}}this.oldLOAN_AMOUNT=x;this.oldDOWNPAYMENT_20=m;var O=KJE.PMT(H/1200,P*12,x);var o=O+k/12+L/12+F;var j=0;var E=0;var G=x;var D=0;var C=0;var U=0;var w=0;var y=0;var b=0;var d=1;var R=1;if(I){var B=this.sSchedule;B.clearRepeat();B.addHeader({sCell:KJE._sHeadingUnderline,sContent:B.sReportCol("Original Loan Schedule",7),sFormat:"COLSPAN=6 scope='colgroup'"});B.addHeader(B.sReportCol("Year",1),B.sReportCol("PI Payments",2),B.sReportCol("Interest",3),B.sReportCol("Principal",4),B.sReportCol("Balance",5),B.sReportCol("Interest Paid",6));var a=this.sSchedule2;a.clearRepeat();a.addHeader({sCell:KJE._sHeadingUnderline,sContent:a.sReportCol("New Loan Schedule",8),sFormat:"COLSPAN=6 scope='colgroup'"});a.addHeader(a.sReportCol("Year",1),a.sReportCol("PI Payments",2),a.sReportCol("Interest",3),a.sReportCol("Principal",4),a.sReportCol("Balance",5),a.sReportCol("Interest Paid",6))}for(var K=1;K<=P*12;K++){j=G*(H/1200);E=O-j;G-=E;D+=j;C+=E;U+=j;w+=E;y+=j;b+=O;if(K>u){r+=j}if(K==u){g=G}if((K%12)==0){if(I&&(d==1)){B.addRepeat(c.number(R),c.dollars(b,2),c.dollars(U,2),c.dollars(C,2),c.dollars(G,2),c.dollars(D,2))}C=0;U=0;b=0;R++}}var N=g;var Q=N/v;var M=this.NEWMONTHLY_PMI;this.NEWMONTH_PMI_EXEMPT=false;var J=v*this.PMI_PERCENTAGE;if(J!=this.oldNEWAPPRAISED_20||N!=this.oldNEW_BALANCE){if((v*(1-this.PMI_PERCENTAGE))<N){M=F}if(J>v-N){if(this.PMI_CALCULATE){M=N*(this.PMI_RATE/1200)}else{M=F}}else{M=0;this.NEWMONTH_PMI_EXEMPT=true}}this.oldNEW_BALANCE=N;this.oldNEWAPPRAISED_20=J;var z=KJE.PMT(h/1200,e*12+V,N);var s=z+k/12+L/12+M;j=0;E=0;G=g;D=0;C=0;U=0;w=0;y=0;R=1;for(var K=1;K<=e*12+V;K++){j=G*(h/1200);E=z-j;G-=E;D+=j;C+=E;U+=j;w+=E;y+=j;if((K%12)==0){if(I&&(d==1)){a.addRepeat((R),c.dollars(z*12,2),c.dollars(U,2),c.dollars(C,2),c.dollars(G,2),c.dollars(D,2))}C=0;U=0;R++}}var T=y;var q=r-T;var p=o-s;var A=l/(o-s);if(q>=0){f=this.MSG_INCREASE2;this.MSG_TITLE=this.MSG_TITLE_INCREASE}else{f=this.MSG_DECREASE2;this.MSG_TITLE=this.MSG_TITLE_DECREASE}f=KJE.replace("INTEREST_AMT_SAVINGS",c.dollars(q<0?q*(-1):q,2),f);this.MSG_TITLE=KJE.replace("INTEREST_AMT_SAVINGS",c.dollars(q<0?q*(-1):q,2),this.MSG_TITLE);this.DS_PAYMENTS[0]=o;this.DS_PAYMENTS[1]=s;this.DS_INTEREST[0]=r;this.DS_INTEREST[1]=T;this.ORIGINAL_LOAN_AMOUNT=x;this.MONTHLY_PMI=F;this.CURRENT_PAYMENT=O;this.CURRENT_BALANCE=g;this.NEW_BALANCE=N;this.CURRENT_PITI=o;this.NEW_PAYMENT=z;this.NEWMONTHLY_PMI=M;this.NEW_PITI=s;this.REMAINING_INTEREST_ON_CURRENT_MORTGAGE=r;this.INTEREST_ON_NEW_MORTGAGE=T;this.INTEREST_SAVINGS=q;this.MONTHLY_SAVINGS=p;this.YOU_WILL_BREAK_EVEN_IN=A;this.NEW_LOAN_TO_VALUE=Q;this.INTEREST_SAVINGS_MSG=f;this.NEW_TERM_PERIODS=V;this.NEW_TERM=e;this.NEW_RATE=h;this.MSG_MONTHLY_SAVINGS="";if(this.MONTHLY_SAVINGS<0){this.MSG_MONTHLY_SAVINGS=this.MSG_INCREASE3;this.BREAK_EVEN_IN_MSG=this.MSG_BREAK_EVEN1}else{this.MSG_MONTHLY_SAVINGS=this.MSG_DECREASE3;if(this.YOU_WILL_BREAK_EVEN_IN<=0){this.BREAK_EVEN_IN_MSG=this.MSG_BREAK_EVEN_IMMEDIATE}else{this.BREAK_EVEN_IN_MSG=this.MSG_BREAK_EVEN2}}this.MSG_MONTHLY_SAVINGS=KJE.replace("MONTHLY_AMT_SAVINGS",c.dollars(this.MONTHLY_SAVINGS<0?this.MONTHLY_SAVINGS*(-1):this.MONTHLY_SAVINGS,2),this.MSG_MONTHLY_SAVINGS)};KJE.ShouldIRefiCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("PMI_PERCENTAGE",c.percent(this.PMI_PERCENTAGE),d);d=KJE.replace("REQUIRED_LTV",c.percent(1-this.PMI_PERCENTAGE),d);d=KJE.replace("MSG_TITLE",this.MSG_TITLE,d);d=KJE.replace("PURCHASE_PRICE",c.dollars(this.PURCHASE_PRICE,2),d);d=KJE.replace("DOWNPAYMENT",c.dollars(this.DOWNPAYMENT,2),d);d=KJE.replace("NEWMONTHLY_PMI",c.dollars(this.NEWMONTHLY_PMI,2),d);d=KJE.replace("APPRAISED_HOME_VALUE",c.dollars(this.APPRAISED_HOME_VALUE,2),d);d=KJE.replace("ORIGINAL_LOAN_AMOUNT",c.dollars(this.ORIGINAL_LOAN_AMOUNT,2),d);d=KJE.replace("ORIGINAL_RATE",c.percent(this.ORIGINAL_RATE/100,3),d);d=KJE.replace("ORIGINAL_TERM_IN_YEARS",c.number(this.ORIGINAL_TERM_IN_YEARS),d);d=KJE.replace("NUMBER_OF_PAYMENTS_MADE",c.number(this.NUMBER_OF_PAYMENTS_MADE),d);d=KJE.replace("CURRENT_PAYMENT",c.dollars(this.CURRENT_PAYMENT,2),d);d=KJE.replace("CURRENT_BALANCE",c.dollars(this.CURRENT_BALANCE,2),d);d=KJE.replace("ANNUAL_PROPERTY_TAXES",c.dollars(this.ANNUAL_PROPERTY_TAXES,2),d);d=KJE.replace("ANNUAL_HOME_INSURANCE",c.dollars(this.ANNUAL_HOME_INSURANCE,2),d);d=KJE.replace("MONTHLY_PMI",c.dollars(this.MONTHLY_PMI,2),d);d=KJE.replace("CURRENT_PITI",c.dollars(this.CURRENT_PITI,2),d);d=KJE.replace("NEW_RATE",c.percent(this.NEW_RATE/100,3),d);d=KJE.replace("NEW_TERM",c.getTermLabel(this.NEW_TERM*12+this.NEW_TERM_PERIODS),d);d=KJE.replace("CLOSING_COSTS",c.dollars(this.CLOSING_COSTS,2),d);d=KJE.replace("NEW_PAYMENT",c.dollars(this.NEW_PAYMENT,2),d);d=KJE.replace("NEW_PITI",c.dollars(this.NEW_PITI,2),d);d=KJE.replace("REMAINING_INTEREST_ON_CURRENT_MORTGAGE",c.dollars(this.REMAINING_INTEREST_ON_CURRENT_MORTGAGE,2),d);d=KJE.replace("INTEREST_ON_NEW_MORTGAGE",c.dollars(this.INTEREST_ON_NEW_MORTGAGE,2),d);d=KJE.replace("INTEREST_SAVINGS_MSG",this.INTEREST_SAVINGS_MSG,d);if(this.INTEREST_SAVINGS<0){d=KJE.replace("INTEREST_SAVINGS",this.MSG_INCREASE1,d)}else{d=KJE.replace("INTEREST_SAVINGS",this.MSG_DECREASE1,d)}d=KJE.replace("INTEREST_AMT_SAVINGS",c.dollars(this.INTEREST_SAVINGS<0?this.INTEREST_SAVINGS*(-1):this.INTEREST_SAVINGS,2),d);d=KJE.replace("MONTHLY_SAVINGS",this.MSG_MONTHLY_SAVINGS,d);d=KJE.replace("MONTHLY_AMT_SAVINGS",c.dollars(this.MONTHLY_SAVINGS<0?this.MONTHLY_SAVINGS*(-1):this.MONTHLY_SAVINGS,2),d);d=KJE.replace("BREAK_EVEN_IN_MSG",this.BREAK_EVEN_IN_MSG,d);d=KJE.replace("YOU_WILL_BREAK_EVEN_IN",c.number(this.YOU_WILL_BREAK_EVEN_IN),d);d=KJE.replace("NEW_LOAN_TO_VALUE",c.percent(this.NEW_LOAN_TO_VALUE,1),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());d=d.replace("**REPEATING GROUP2**",this.sSchedule2.getRepeat());this.sSchedule.clearRepeat();this.sSchedule2.clearRepeat();return d};KJE.CalcName="Should I Refinance Calculator";KJE.CalcType="simplerefi";KJE.CalculatorTitleTemplate="Refinance Interest Savings";KJE.parseInputs=function(a){a=KJE.replace("**ORIGINAL_TERM_IN_YEARS**",KJE.getMortgageTermDrop("ORIGINAL_TERM_IN_YEARS",30),a);a=KJE.replace("**NEW_TERM**",KJE.getMortgageTermDrop("NEW_TERM",30),a);return a};KJE.initialize=function(){KJE.CalcControl=new KJE.ShouldIRefiCalc();KJE.GuiControl=new KJE.ShouldIRefi(KJE.CalcControl)};KJE.ShouldIRefi=function(m){var f=KJE;var c=KJE.gLegend;var h=KJE.inputs.items;KJE.MortgageAmtSlider("PURCHASE_PRICE","Purchase price");KJE.MortgageAmtSlider("DOWNPAYMENT","Down payment");KJE.Label("LOAN_AMOUNT_CALCULATED","Loan amount",null,null,"KJEBold");KJE.MortgageTermDropBoxSlider("ORIGINAL_TERM_IN_YEARS","Original term in years");KJE.MortgageTermDropBoxSlider("NEW_TERM","New term in years");KJE.MortgageAmtSlider("APPRAISED_HOME_VALUE","Appraised value");KJE.MortgageAmtSlider("ORIGINAL_LOAN_AMOUNT","Original mortgage");KJE.MortgageRateSlider("ORIGINAL_RATE","Original interest rate");KJE.NumberSlider("NUMBER_OF_PAYMENTS_MADE","Number of payments made",1,360,0);KJE.DollarSlider("ANNUAL_PROPERTY_TAXES","Annual property taxes",0,100000);KJE.DollarSlider("ANNUAL_HOME_INSURANCE","Annual home insurance",0,100000);KJE.InputItem.AltHelpName="MONTHLY_PMI";KJE.DollarSlider("MONTHLY_PMI","Original monthly PMI",0,1000);KJE.DollarSlider("NEWMONTHLY_PMI","New monthly PMI",0,1000);KJE.InputItem.AltHelpName=null;KJE.MortgageRateSlider("NEW_RATE","New interest rate");KJE.DollarSlider("CLOSING_COSTS","Closing costs",0,100000);KJE.Label("CURRENT_BALANCE","New mortgage balance");if(m.PMI_CALCULATE){h.ORIGINAL_LOAN_AMOUNT.hide()}else{h.LOAN_AMOUNT_CALCULATED.hide();h.PURCHASE_PRICE.hide();h.DOWNPAYMENT.hide()}var j=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,false,KJE.colorList[1],m.MSG_TITLE_DECREASE);j._legend._iOrientation=(c.TOP_RIGHT);j._showItemLabel=true;j._axisX.setVisible(false);var i=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Your payment will KJE1 per month"));i._legend._iOrientation=(c.TOP_RIGHT);i._colorList=[KJE.gColorList[2],KJE.gColorList[3]];i._showItemLabel=true;i._axisX.setVisible(false);var a=KJE.parameters.get("MSG_DROPPER3_TITLE","About your home:");KJE.addDropper(new KJE.Dropper("INPUTS3",true,a,a),KJE.colorList[0]);var b=KJE.parameters.get("MSG_DROPPER_TITLE","Original mortgage:");var d=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Monthly payment KJE1");var e=function(){return b+"|"+KJE.subText(KJE.getKJEReplaced(d,f.dollars(m.CURRENT_PITI)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("INPUTS",true,e,e),KJE.colorList[0]);var n=KJE.parameters.get("MSG_DROPPER2_TITLE","New mortgage:");var g=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","Monthly payment KJE1");var k=function(){return n+"|"+KJE.subText(KJE.getKJEReplaced(g,f.dollars(m.NEW_PITI)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("INPUTS2",true,k,k),KJE.colorList[0])};KJE.ShouldIRefi.prototype.setValues=function(b){var a=KJE.inputs.items;b.ORIGINAL_TERM_IN_YEARS=a.ORIGINAL_TERM_IN_YEARS.getValue();b.NEW_TERM=a.NEW_TERM.getValue();b.APPRAISED_HOME_VALUE=a.APPRAISED_HOME_VALUE.getValue();b.ORIGINAL_LOAN_AMOUNT=a.ORIGINAL_LOAN_AMOUNT.getValue();b.ORIGINAL_RATE=a.ORIGINAL_RATE.getValue();b.NUMBER_OF_PAYMENTS_MADE=a.NUMBER_OF_PAYMENTS_MADE.getValue();b.ANNUAL_PROPERTY_TAXES=a.ANNUAL_PROPERTY_TAXES.getValue();b.ANNUAL_HOME_INSURANCE=a.ANNUAL_HOME_INSURANCE.getValue();b.MONTHLY_PMI=a.MONTHLY_PMI.getValue();b.NEWMONTHLY_PMI=a.NEWMONTHLY_PMI.getValue();b.NEW_RATE=a.NEW_RATE.getValue();b.CLOSING_COSTS=a.CLOSING_COSTS.getValue();b.DOWNPAYMENT=a.DOWNPAYMENT.getValue();b.PURCHASE_PRICE=a.PURCHASE_PRICE.getValue()};KJE.ShouldIRefi.prototype.refresh=function(f){var e=KJE;var d=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[1];var c=KJE.gGraphs[0];KJE.setTitleTemplate();a.removeAll();a.setGraphCategories(f.catlabel);a.add(new KJE.gGraphDataSeries(f.DS_PAYMENTS,""));a.setTitleTemplate(f.MSG_MONTHLY_SAVINGS);a.paint();c.removeAll();c.setGraphCategories(f.cats);c.add(new KJE.gGraphDataSeries(f.DS_INTEREST,""));c.setTitle(f.MSG_TITLE);c.paint();b.CURRENT_BALANCE.setText(e.dollars(f.CURRENT_BALANCE,2));b.LOAN_AMOUNT_CALCULATED.setText(e.dollars(f.ORIGINAL_LOAN_AMOUNT,2));b.MONTHLY_PMI.setValue(e.round(f.MONTHLY_PMI,2),true);if(f.MONTH_PMI_EXEMPT){b.MONTHLY_PMI.disable()}else{b.MONTHLY_PMI.enable()}b.NEWMONTHLY_PMI.setValue(e.round(f.NEWMONTHLY_PMI,2),true);if(f.NEWMONTH_PMI_EXEMPT){b.NEWMONTHLY_PMI.disable()}else{b.NEWMONTHLY_PMI.enable()}};KJE.InputScreenText=" <div id=KJE-D-INPUTS3><div id=KJE-P-INPUTS3>Input information:</div></div> <div id=KJE-E-INPUTS3 > <div id='KJE-C-APPRAISED_HOME_VALUE'><input id='KJE-APPRAISED_HOME_VALUE' /></div> <div id='KJE-C-ANNUAL_PROPERTY_TAXES'><input id='KJE-ANNUAL_PROPERTY_TAXES' /></div> <div id='KJE-C-ANNUAL_HOME_INSURANCE'><input id='KJE-ANNUAL_HOME_INSURANCE' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id=\"KJE-C-PURCHASE_PRICE\"><input id=\"KJE-PURCHASE_PRICE\" /></div> <div id=\"KJE-C-DOWNPAYMENT\"><input id=\"KJE-DOWNPAYMENT\" /></div> <div id=\"KJE-C-LOAN_AMOUNT_CALCULATED\"><div id=\"KJE-LOAN_AMOUNT_CALCULATED\"></div></div> <div id='KJE-C-ORIGINAL_LOAN_AMOUNT'><input id='KJE-ORIGINAL_LOAN_AMOUNT' /></div> <div id='KJE-C-ORIGINAL_RATE'><input id='KJE-ORIGINAL_RATE' /></div> <div id='KJE-C-ORIGINAL_TERM_IN_YEARS'>**ORIGINAL_TERM_IN_YEARS**</div> <div id='KJE-C-MONTHLY_PMI'><input id='KJE-MONTHLY_PMI' /></div> <div id='KJE-C-NUMBER_OF_PAYMENTS_MADE'><input id='KJE-NUMBER_OF_PAYMENTS_MADE' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-CURRENT_BALANCE'><div id='KJE-CURRENT_BALANCE'></div></div> <div id='KJE-C-NEW_RATE'><input id='KJE-NEW_RATE' /></div> <div id='KJE-C-NEW_TERM'>**NEW_TERM**</div> <div id='KJE-C-CLOSING_COSTS'><input id='KJE-CLOSING_COSTS' /></div> <div id='KJE-C-NEWMONTHLY_PMI'><input id='KJE-NEWMONTHLY_PMI' /></div> <div style=\"height:10px\"></div> </div> **GRAPH2** **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-APPRAISED_HOME_VALUE' ><dt>Appraised home value</dt><dd>Current market value of your home.</dd></div> <div id='KJE-D-ANNUAL_PROPERTY_TAXES' ><dt>Annual property taxes</dt><dd>Your annual property taxes.</dd></div> <div id='KJE-D-ANNUAL_HOME_INSURANCE' ><dt>Annual home insurance</dt><dd>Your annual homeowner's insurance premium.</dd></div> <div id='KJE-D-LOAN_AMOUNT_CALCULATED' ><dt>Original loan amount</dt><dd>Total amount of your original mortgage.</dd></div> <div id='KJE-D-ORIGINAL_RATE' ><dt>Original interest rate</dt><dd>Interest rate of your original mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</dd></div> <div id='KJE-D-ORIGINAL_TERM_IN_YEARS' ><dt>Original term in years</dt><dd>Total number of years of your original mortgage.</dd></div> <div id='KJE-D-MONTHLY_PMI'><dt>Monthly PMI</dt><dd>Monthly cost of Private Mortgage Insurance (PMI). For loans secured with less than 20% down, PMI is estimated at 0.5% of your loan balance each year but can be higher or lower depending on the loan and your credit score.</dd></div> <div id='KJE-D-NUMBER_OF_PAYMENTS_MADE' ><dt>Number of payments made</dt><dd>The total number of payments you have made on your original mortgage.</dd></div> <div id='KJE-D-NEW_RATE' ><dt>New interest rate</dt><dd>Interest rate of your new mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</dd></div> <div id='KJE-D-NEW_TERM' ><dt>New term</dt><dd>Total number of years of your new mortgage.</dd></div> <div id='KJE-D-CURRENT_BALANCE' ><dt>New mortgage balance</dt><dd>Total amount for your new refinanced mortgage. This amount is equal to your current balance on your original mortgage. Closing costs and prepayment penalties are assumed to be payable at the time of closing. Closing costs are not added to your new mortgage balance.</dd></div> <div id='KJE-D-CLOSING_COSTS' ><dt>Closing costs</dt><dd>Total fees and other costs associated with the new mortgage, paid at the time of closing. This calculator assumes that all closing costs are paid separately and are not rolled into the new mortgage amount.</dd></div> <div id='KJE-D-1'><dt>New loan-to-value</dt><dd>Total loan amount divided by the appraised value of your home.</dd></div> ";KJE.ReportText=' <!--HEADING "Refinance Interest Savings" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Refinance Interest Savings</h2>Over the life of your new mortgage your total interest paid will INTEREST_SAVINGS and your monthly payment will MONTHLY_SAVINGS per month. BREAK_EVEN_IN_MSG **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>About Your Home and Current Mortgage</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell50" scope=\'row\'>Annual property taxes</th><td class="KJECell KJECell50"> ANNUAL_PROPERTY_TAXES</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual home insurance</th><td class="KJECell"> ANNUAL_HOME_INSURANCE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Appraised home value</th><td class="KJECell"> APPRAISED_HOME_VALUE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Original mortgage amount</th><td class="KJECell"> ORIGINAL_LOAN_AMOUNT</td><tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Number of payments made</th><td class="KJECell"> NUMBER_OF_PAYMENTS_MADE</td></tr> </tbody> </table> </div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Refinancing Results</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder KJECell50" scope=\'row\'>Remaining interest on current mortgage</th><td class="KJECell KJECell50"> REMAINING_INTEREST_ON_CURRENT_MORTGAGE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest on new mortgage</th><td class="KJECell"> INTEREST_ON_NEW_MORTGAGE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest paid</th><td class="KJECell"> INTEREST_SAVINGS</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly payment</th><td class="KJECell"> MONTHLY_SAVINGS per month</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>New loan-to-value</th><td class="KJECell"> NEW_LOAN_TO_VALUE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Refinance break even</th><td class="KJECell"> BREAK_EVEN_IN_MSG</td></tr> </tbody> </table> </div> <h2 class=\'KJEReportHeader KJEFontHeading\'>Original Mortgage vs. Refinance Comparison</h2> Refinancing will change your monthly payment for principal, interest, taxes and insurance from CURRENT_PITI to NEW_PITI. To avoid PMI payments on your new loan you need a loan-to-value ratio of REQUIRED_LTV or less. Your loan-to-value ratio is currently estimated at NEW_LOAN_TO_VALUE. Additional refinancing results are summarized below: **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><td class="KJEHeading KJECell50">&nbsp;</td><th class="KJEHeading KJECell25" scope=\'col\'>Original Mortgage</th><th class="KJEHeading KJECell25" scope=\'col\'>New Mortgage</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Mortgage amount</th><td class="KJECell KJECellBorder"> ORIGINAL_LOAN_AMOUNT</td><td class="KJECell">CURRENT_BALANCE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate</th><td class="KJECell KJECellBorder"> ORIGINAL_RATE</td><td class="KJECell">NEW_RATE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term in years</th><td class="KJECell KJECellBorder"> ORIGINAL_TERM_IN_YEARS</td><td class="KJECell">NEW_TERM</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Payment (PI)</th><td class="KJECell KJECellBorder"> CURRENT_PAYMENT</td><td class="KJECell">NEW_PAYMENT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Payment (PITI)</th><td class="KJECell KJECellBorder"> CURRENT_PITI</td><td class="KJECell">NEW_PITI</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly PMI</th><td class="KJECell KJECellBorder"> MONTHLY_PMI</td><td class="KJECell">NEWMONTHLY_PMI</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** <p></p> **REPEATING GROUP2** ';


