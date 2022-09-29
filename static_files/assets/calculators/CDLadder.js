
KJE.parameters.set("MONTHLY_RATE1",0.03);KJE.parameters.set("MONTHLY_RATE6",0.05);KJE.parameters.set("MONTHLY_RATE12",0.1);KJE.parameters.set("MONTHLY_RATE18",0.12);KJE.parameters.set("MONTHLY_RATE24",0.15);KJE.parameters.set("MONTHLY_RATE30",0.17);KJE.parameters.set("MONTHLY_RATE36",0.2);KJE.parameters.set("MONTHLY_RATE42",0.2);KJE.parameters.set("MONTHLY_RATE48",0.3);KJE.parameters.set("MONTHLY_RATE60",0.45);KJE.CDLadderCalc=function(){this.TOTAL_TO_INVEST=0;this.FUND_INDEX=KJE.Default.CD_MATURE_ANNUAL;this.FUND_ACCESS=0;this.OLD_FUND_ACCESS=0;this.PERIODIC_AMOUNT_AVAILABLE=0;this.CD_STARTING_AMOUNT=0;this.MSG_LADDER_ROW=KJE.parameters.get("MSG_LADDER_ROW","<tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>qq</th><td class='KJECell KJECellBorder'>CD_TIME_LABELqq</td><td class='KJECell KJECellBorder '>CD_RATE_OF_RETURNqq</td><td class='KJECell KJECellBorder '>CD_APYqq</td><td class='KJECell KJECellBorder'>CD_STARTING_AMOUNT</td><td class='KJECell '>CD_FIRST_MATURITYqq</td></tr>");this.MSG_LADDER_RESULT=KJE.parameters.get("MSG_LADDER_RESULT","You will have earned MSG_AMOUNT using CD Laddering.*");this.MSG_MORE=KJE.parameters.get("MSG_MORE","more");this.MSG_LESS=KJE.parameters.get("MSG_LESS","less");this.MSG_CALC_AMOUNT=KJE.parameters.get("MSG_CALC_AMOUNT","CALC_AMOUNT MSG_CHANGE");this.CALC_AMOUNT="";this.LADDER_RESULT="";this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Longest maturity can't exceed 360 months (30 years)");this.dRatesOfReturn=KJE.FloatArray(360);for(var a=1;a<=this.dRatesOfReturn.length;a++){this.setPeriodRate(a,KJE.parameters.get("MONTHLY_RATE"+a,0))}this.NUMBER_OF_CDS=-1;this.OLD_NUMBER_OF_CDS=-1;this.MIN_NUMBER_CDS=KJE.parameters.get("MIN_NUMBER_CDS",1);this.CD_LADDER_TOTAL=0;this.SINGLE_CD_TOTAL=0;this.LADDER_DIFFERENCE=0;this.COMPOUND_INDEX=KJE.Default.COMPOUND_ANNUALLY;this.COMPOUND_DESC="";this.CD_MAX_COUNT=10;this.CD_RATE_OF_RETURN=KJE.FloatArray(this.CD_MAX_COUNT);this.CD_MONTHS=new Array(this.CD_MAX_COUNT);this.CD_FINAL_BALANCE=KJE.FloatArray(this.CD_MAX_COUNT);this.CD_FIRST_MATURITY=KJE.FloatArray(this.CD_MAX_COUNT);this.CD_INTEREST_EARNED=KJE.FloatArray(this.CD_MAX_COUNT);this.CD_APY=KJE.FloatArray(this.CD_MAX_COUNT);this.CD_TIME_LABEL=new Array(this.CD_MAX_COUNT);this.cats=null;this.sSchedule=new KJE.Repeating()};KJE.CDLadderCalc.prototype.clear=function(){};KJE.CDLadderCalc.prototype.calculate=function(l){var b=KJE;var h=KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX];var k=KJE.Default.COMPOUND_VALUE[this.COMPOUND_INDEX];this.COMPOUND_DESC=KJE.Default.COMPOUND_SELECTIONS[this.COMPOUND_INDEX];this.FUND_ACCESS=KJE.Default.CD_MATURE_VALUE[this.FUND_INDEX];var f=this.TOTAL_TO_INVEST;var o=Math.floor(f/this.PERIODIC_AMOUNT_AVAILABLE);if(o<this.MIN_NUMBER_CDS){o=this.MIN_NUMBER_CDS}if(o>this.CD_RATE_OF_RETURN.length){o=this.CD_RATE_OF_RETURN.length}this.DR_BALANCE=KJE.FloatArray(o);this.DR_SINGLE_BALANCE=KJE.FloatArray(o);this.DR_CD_BALANCE=KJE.FloatArray(o);this.CD_STARTING_AMOUNT=b.round(f/o,2);for(var a=0;a<this.CD_FINAL_BALANCE.length;a++){this.CD_FINAL_BALANCE[a]=0;this.CD_INTEREST_EARNED[a]=0;this.CD_APY[a]=0;this.CD_MONTHS[a]=0;this.CD_TIME_LABEL[a]=""}for(var a=0;a<this.CD_MAX_COUNT;a++){this.CD_MONTHS[a]=this.FUND_ACCESS*(a+1);this.CD_TIME_LABEL[a]=KJE.getTermLabel(this.CD_MONTHS[a],false);if(this.CD_MONTHS[a]>360&&a<o){throw (this.MSG_ERROR1)}var c=this.getPeriodRate(this.CD_MONTHS[a]);if((this.OLD_NUMBER_OF_CDS==-1&&this.CD_RATE_OF_RETURN[a])||(this.CD_RATE_OF_RETURN[a]>0&&this.CD_RATE_OF_RETURN[a]!=c&&this.OLD_NUMBER_OF_CDS==o&&this.OLD_FUND_ACCESS==this.FUND_ACCESS)){this.setPeriodRate(this.CD_MONTHS[a],this.CD_RATE_OF_RETURN[a])}else{this.CD_RATE_OF_RETURN[a]=c}}var m=(this.CD_RATE_OF_RETURN[o-1]/100)/k;this.CD_LADDER_TOTAL=0;for(var a=0;a<o;a++){var j=(this.CD_RATE_OF_RETURN[a]/100)/k;this.CD_APY[a]=KJE.FV_AMT((this.CD_RATE_OF_RETURN[a]/100)/k,k,1)-1;this.CD_FIRST_MATURITY[a]=b.round(KJE.FV_AMT(j,(k/12)*this.CD_MONTHS[a],this.CD_STARTING_AMOUNT),2);if(a==(o-1)){this.CD_FINAL_BALANCE[a]=this.CD_FIRST_MATURITY[a]}else{this.CD_FINAL_BALANCE[a]=b.round(KJE.FV_AMT(m,(k/12)*((o*this.FUND_ACCESS)-this.CD_MONTHS[a]),this.CD_FIRST_MATURITY[a]),2)}this.CD_INTEREST_EARNED[a]=this.CD_FINAL_BALANCE[a]-this.CD_STARTING_AMOUNT;this.CD_LADDER_TOTAL+=this.CD_FINAL_BALANCE[a]}this.OLD_NUMBER_OF_CDS=o;this.OLD_FUND_ACCESS=this.FUND_ACCESS;for(var a=0;a<o;a++){this.DR_CD_BALANCE[a]=0;for(var e=0;e<o;e++){if(a==o-1){this.DR_CD_BALANCE[a]+=this.CD_FINAL_BALANCE[e]}else{if(e<=a){this.DR_CD_BALANCE[a]+=this.CD_FIRST_MATURITY[e];if(e<a){this.DR_CD_BALANCE[a]+=b.round(KJE.FV_AMT(m,(k/12)*((a-e)*this.FUND_ACCESS),this.CD_FIRST_MATURITY[e])-this.CD_FIRST_MATURITY[e],2)}}else{var c=(this.CD_RATE_OF_RETURN[e]/100)/k;this.DR_CD_BALANCE[a]+=b.round(KJE.FV_AMT(c,(k/12)*((a+1)*this.FUND_ACCESS),this.CD_STARTING_AMOUNT),2)}}}}var g=(this.CD_RATE_OF_RETURN[0]/100)/k;this.SINGLE_CD_TOTAL=0;for(var a=0;a<o;a++){this.DR_SINGLE_BALANCE[a]=b.round(KJE.FV_AMT(g,(k/12)*this.FUND_ACCESS,(a==0?this.TOTAL_TO_INVEST:this.DR_SINGLE_BALANCE[a-1])),2);this.DR_BALANCE[a]=this.DR_CD_BALANCE[a]}this.SINGLE_CD_TOTAL=this.DR_SINGLE_BALANCE[o-1];if(l){var d=this.sSchedule;d.clearRepeat();d.addHeader(d.sReportCol("Month",1),d.sReportCol("Balance of Single CD",2),d.sReportCol("Balance of CD Ladder",3))}this.cats=KJE.FloatArray(o);for(var e=0;e<o;e++){this.cats[e]=""+this.CD_MONTHS[e];if(l){d.addRepeat(b.number(this.CD_MONTHS[e]),b.dollars(this.DR_SINGLE_BALANCE[e],2),b.dollars(this.DR_BALANCE[e],2))}}this.LADDER_DIFFERENCE=this.CD_LADDER_TOTAL-this.SINGLE_CD_TOTAL;this.CALC_AMOUNT=KJE.replace("CALC_AMOUNT",(this.LADDER_DIFFERENCE>0?b.dollars(this.LADDER_DIFFERENCE,2):b.dollars(this.LADDER_DIFFERENCE*-1,2)),KJE.replace("MSG_CHANGE",(this.LADDER_DIFFERENCE>0?this.MSG_MORE:this.MSG_LESS),this.MSG_CALC_AMOUNT));this.LADDER_RESULT=KJE.replace("MSG_TERM",this.CD_TIME_LABEL[o-1],KJE.replace("MSG_AMOUNT",this.CALC_AMOUNT,this.MSG_LADDER_RESULT));this.sFreq=h;this.NUMBER_OF_CDS=o};KJE.CDLadderCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("TOTAL_TO_INVEST",c.dollars(this.TOTAL_TO_INVEST,2),d);d=KJE.replace("COMPOUND_DESC",this.COMPOUND_DESC,d);d=KJE.replace("NUMBER_OF_CDS",c.number(this.NUMBER_OF_CDS,0),d);d=KJE.replace("CD_LADDER_TOTAL",c.dollars(this.CD_LADDER_TOTAL,2),d);d=KJE.replace("SINGLE_CD_TOTAL",c.dollars(this.SINGLE_CD_TOTAL,2),d);d=KJE.replace("CD_TIME_LONGEST",this.CD_TIME_LABEL[this.NUMBER_OF_CDS-1],d);d=KJE.replace("FUND_ACCESS",c.number(this.FUND_ACCESS),d);d=KJE.replace("PERIODIC_AMOUNT_AVAILABLE",c.dollars(this.PERIODIC_AMOUNT_AVAILABLE,2),d);d=KJE.replace("CALC_AMOUNT",this.CALC_AMOUNT,d);d=KJE.replace("LADDER_RESULT",this.LADDER_RESULT,d);var f="";for(var e=0;e<this.NUMBER_OF_CDS;e++){f+=KJE.replace("qq",""+(e+1),this.MSG_LADDER_ROW)}d=KJE.replace("<!--**CD_LADDER**-->",f,d);for(var e=this.NUMBER_OF_CDS-1;e>=0;e--){d=KJE.replace("CD_RATE_OF_RETURN"+(e+1),c.percent(this.CD_RATE_OF_RETURN[e]/100,2),d);d=KJE.replace("CD_MONTHS"+(e+1),c.number(this.CD_MONTHS[e],0),d);d=KJE.replace("CD_FINAL_BALANCE"+(e+1),c.dollars(this.CD_FINAL_BALANCE[e],2),d);d=KJE.replace("CD_FIRST_MATURITY"+(e+1),c.dollars(this.CD_FIRST_MATURITY[e],2),d);d=KJE.replace("CD_INTEREST_EARNED"+(e+1),c.dollars(this.CD_INTEREST_EARNED[e],2),d);d=KJE.replace("CD_APY"+(e+1),c.percent(this.CD_APY[e],3),d);d=KJE.replace("CD_TIME_LABEL"+(e+1),this.CD_TIME_LABEL[e],d)}d=KJE.replace("CD_STARTING_AMOUNT",c.dollars(this.CD_STARTING_AMOUNT,2),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.CDLadderCalc.prototype.setPeriodRate=function(a,b){if(a>360){return}if(a<1){return}if(b>20){return}if(b<=0){return}this.dRatesOfReturn[a-1]=b};KJE.CDLadderCalc.prototype.getPeriodRate=function(a){if(a>360){a=360}if(a<=0){a=1}a--;for(var b=a;b>=0;b--){if(this.dRatesOfReturn[b]!=0){return this.dRatesOfReturn[b]}}return this.dRatesOfReturn[0]};KJE.Default.COMPOUND_DAILY=0;KJE.Default.COMPOUND_MONTHLY=1;KJE.Default.COMPOUND_QRTLY=2;KJE.Default.COMPOUND_SEMI=3;KJE.Default.COMPOUND_ANNUALLY=4;KJE.Default.COMPOUND_SELECTIONS=["compound daily","compound monthly","compound quarterly","compound semi-annually","compound annually"];KJE.Default.COMPOUND_DESC=["Day","Month","Quarter","Semi-annual","Year"];KJE.Default.COMPOUND_VALUE=[360,12,4,2,1];KJE.Default.COMPOUND_INDEX=[0,1,2,3,4];KJE.Default.CD_MATURE_ANNUAL=3;KJE.Default.CD_MATURE_SELECTIONS=["3 months","6 months","9 months","12 months","18 months","24 months"];KJE.Default.CD_MATURE_VALUE=[3,6,9,12,18,24];KJE.Default.CD_MATURE_INDEX=[0,1,2,3,4,5];KJE.CalcName="CD Ladder Calculator";KJE.CalcType="CDLadder";KJE.CalculatorTitle="CD Ladder Calculator";KJE.parseInputs=function(b){var a=KJE.getDropBox("FUND_INDEX",KJE.parameters.get("FUND_INDEX",KJE.Default.CD_MATURE_ANNUAL),KJE.Default.CD_MATURE_INDEX,KJE.Default.CD_MATURE_SELECTIONS);b=KJE.replace("**FUND_INDEX**",a,b);a=KJE.getDropBox("COMPOUND_INDEX",KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY),KJE.Default.COMPOUND_INDEX,KJE.Default.COMPOUND_SELECTIONS);b=KJE.replace("**COMPOUND_INDEX**",a,b);b=KJE.replace("**MSG_LADDER_FOOTER**",KJE.parameters.get("MSG_LADDER_FOOTER","*Note that at the end of the time period shown, only a portion of your CD Ladder balance is liquid, while the entire Single CD balance is liquid."),b);return b};KJE.initialize=function(){KJE.CalcControl=new KJE.CDLadderCalc();KJE.GuiControl=new KJE.CDLadder(KJE.CalcControl)};KJE.CDLadder=function(j){var f=KJE;var b=KJE.gLegend;var g=KJE.inputs.items;this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","CD Ladder");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Single CD");KJE.DollarSlider("TOTAL_TO_INVEST","Total to invest",KJE.parameters.get("CD_MINIMUM",500),100000000,0,0,4);KJE.DollarSlider("PERIODIC_AMOUNT_AVAILABLE","Amount in each CD",KJE.parameters.get("CD_MINIMUM",500),KJE.parameters.get("CD_MAXIMUM",1000000));KJE.DropBox("COMPOUND_INDEX","Interest is compounded");KJE.DropBox("FUND_INDEX","Frequency of maturing CD");KJE.Label("NUMBER_OF_CDS","CDs in ladder",null,null,"KJEBold");var i=KJE.parameters.get("MSG_CD_RATE_OF_RETURN","CD interest rate");for(var d=0;d<j.CD_MAX_COUNT;d++){KJE.PercentSlider("CD_RATE_OF_RETURN"+(d+1),i,0,20,2)}var h=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],this.MSG_LADDER_RESULT);h._legend._iOrientation=(b.TOP_RIGHT);h._titleXAxis.setText(KJE.parameters.get("MSG_LABEL11","Months"));var a=KJE.parameters.get("MSG_DROPPER_TITLE","CD Ladder inputs:");var c=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Total to invest KJE1, Amount per CD KJE2, CDs mature every KJE3 months");var e=function(){return a+KJE.subText(KJE.getKJEReplaced(c,g.TOTAL_TO_INVEST.getFormatted(),g.PERIODIC_AMOUNT_AVAILABLE.getFormatted(),f.number(j.FUND_ACCESS)),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",true,a,e),KJE.colorList[0]);var k=KJE.parameters.get("MSG_DROPPER2_TITLE","CD Interest Rates:");KJE.addDropper(new KJE.Dropper("INPUTS2",false,k,k),KJE.colorList[0]);KJE.addDiv("FOOTER1",KJE.colorList[1])};KJE.CDLadder.prototype.setValues=function(b){var a=KJE.inputs.items;b.COMPOUND_INDEX=Math.round(a.COMPOUND_INDEX.getValue());b.FUND_INDEX=Math.round(a.FUND_INDEX.getValue());b.TOTAL_TO_INVEST=a.TOTAL_TO_INVEST.getValue();b.PERIODIC_AMOUNT_AVAILABLE=a.PERIODIC_AMOUNT_AVAILABLE.getValue();for(var c=0;c<b.CD_MAX_COUNT;c++){b.CD_RATE_OF_RETURN[c]=a["CD_RATE_OF_RETURN"+(c+1)].getValue()}};KJE.CDLadder.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();a.setGraphCategories(e.cats);a.add(new KJE.gGraphDataSeries(e.DR_BALANCE,this.MSG_GRAPH1,a.getColor(1),null,this.MSG_GRAPH1+" "+KJE.MSG_MONTH_LBL));a.add(new KJE.gGraphDataSeries(e.DR_SINGLE_BALANCE,this.MSG_GRAPH2,a.getColor(2),null,this.MSG_GRAPH2+" "+KJE.MSG_MONTH_LBL));a.setTitle(e.LADDER_RESULT);a.paint();b.NUMBER_OF_CDS.setText(d.number(e.NUMBER_OF_CDS),true);for(var f=0;f<e.CD_MAX_COUNT;f++){KJE.setLabelText(b["CD_RATE_OF_RETURN"+(f+1)]._label,e.CD_TIME_LABEL[f]+KJE.Colon+" ");b["CD_RATE_OF_RETURN"+(f+1)].setValue(e.CD_RATE_OF_RETURN[f],true);if(f<e.NUMBER_OF_CDS){b["CD_RATE_OF_RETURN"+(f+1)].enable()}else{b["CD_RATE_OF_RETURN"+(f+1)].disable()}}b.PERIODIC_AMOUNT_AVAILABLE.setValue(e.CD_STARTING_AMOUNT,true)};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-TOTAL_TO_INVEST'><input id='KJE-TOTAL_TO_INVEST' /></div> <div id='KJE-C-PERIODIC_AMOUNT_AVAILABLE'><input id='KJE-PERIODIC_AMOUNT_AVAILABLE' /></div> <div id='KJE-C-FUND_INDEX'>**FUND_INDEX**</div> <div id='KJE-C-COMPOUND_INDEX'>**COMPOUND_INDEX**</div> <div id='KJE-C-NUMBER_OF_CDS'><div id='KJE-NUMBER_OF_CDS'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-CD_RATE_OF_RETURN1'><input id='KJE-CD_RATE_OF_RETURN1' /></div> <div id='KJE-C-CD_RATE_OF_RETURN2'><input id='KJE-CD_RATE_OF_RETURN2' /></div> <div id='KJE-C-CD_RATE_OF_RETURN3'><input id='KJE-CD_RATE_OF_RETURN3' /></div> <div id='KJE-C-CD_RATE_OF_RETURN4'><input id='KJE-CD_RATE_OF_RETURN4' /></div> <div id='KJE-C-CD_RATE_OF_RETURN5'><input id='KJE-CD_RATE_OF_RETURN5' /></div> <div id='KJE-C-CD_RATE_OF_RETURN6'><input id='KJE-CD_RATE_OF_RETURN6' /></div> <div id='KJE-C-CD_RATE_OF_RETURN7'><input id='KJE-CD_RATE_OF_RETURN7' /></div> <div id='KJE-C-CD_RATE_OF_RETURN8'><input id='KJE-CD_RATE_OF_RETURN8' /></div> <div id='KJE-C-CD_RATE_OF_RETURN9'><input id='KJE-CD_RATE_OF_RETURN9' /></div> <div id='KJE-C-CD_RATE_OF_RETURN10'><input id='KJE-CD_RATE_OF_RETURN10' /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** <div id=KJE-D-FOOTER1><div class=KJECenter>**MSG_LADDER_FOOTER**</div></div> ";KJE.DefinitionText=" <div id='KJE-D-OVERVIEW'><dt>Calculation note</dt>To maximize the results of the CD Ladder, each maturing CD should be reinvested in a new CD with a term equal to the longest term CD. This strategy allows you to take advantage of the higher rates normally associated with longer-term CDs while maintaining frequent access to your funds.<p>For example: If you established a ladder with 6-month, 12-month, 18-month and 24-month terms, when the 6-month CD matures, invest the funds in a new 24-month CD. Similarly, when the 12-month CD matures, invest the funds in another new 24-month CD, and so on. At the end of two years you'll have four, 24-month CDs with a CD maturing every six months.</div> <div id='KJE-D-TOTAL_TO_INVEST' ><dt>Total to invest</dt><dd>This is the total amount to invest in your CD Ladder.</dd></div> <div id='KJE-D-PERIODIC_AMOUNT_AVAILABLE' ><dt>Amount in each CD</dt><dd>How much you wish to invest in each CD in your ladder. We use this amount to calculate the number of CDs in the ladder. If the amount that you enter isn't evenly divisible by the total you wish to put into your CD Ladder, we will automatically adjust it up to an evenly divisible amount.</dd></div> <div id='KJE-D-FUND_INDEX' ><dt>Frequency of Maturing CDs</dt><dd>How often you would like to have a CD mature. For example, if you choose six months, one of your CDs in your CD ladder will mature every six months.</dd></div> <div id='KJE-D-NUMBER_OF_CDS' ><dt>CDs in your Ladder</dt><dd>The number of CDs that will be in your CD ladder. Each CD will have a different maturity date, so that one of your CDs will mature at the frequency you specify. This calculator assumes that you redeposit all matured CDs into new CDs that have a term of the longest maturity in your original CD ladder.</dd></div> <div id='KJE-D-COMPOUND_INDEX' ><dt>Interest is compounded</dt><dd>The interest earned on your CDs is added to your CD balance at regular intervals. This is called \"compounding.\" This calculator allows you to choose the frequency that your CDs' interest income is compounded. The more frequently this occurs, the sooner your accumulated interest income will generate additional interest. You may wish to check with your local branch or account opening documents to find out how often interest is being compounded on your CDs.</dd></div> ";KJE.ReportText=' <p><!--HEADING "CD Ladder Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>At the end of the time period shown, your CD Ladder balance will be CD_LADDER_TOTAL.</h2> At the end of CD_TIME_LONGEST, your balance using CD Laddering will be CD_LADDER_TOTAL and a portion of that will be liquid. Using a single short-term rollover CD, your balance will be SINGLE_CD_TOTAL and be entirely liquid. LADDER_RESULT **GRAPH** <p><div class="KJECenter">Note that at the end of the time period shown, only a portion of your CD Ladder balance is liquid, while the entire Single CD balance is liquid.</div></p> <!--hidestart--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>CD Ladder </th><td class="KJECellStrong"> CD_LADDER_TOTAL </td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Total to invest </th><td class="KJECell KJECell40"> TOTAL_TO_INVEST </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Frequency of CDs maturing </th><td class="KJECell"> FUND_ACCESS months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Amount in each CD </th><td class="KJECell"> PERIODIC_AMOUNT_AVAILABLE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>CDs in your ladder </th><td class="KJECell"> NUMBER_OF_CDS </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest is compounded </th><td class="KJECell"> COMPOUND_DESC </td></tr> </tbody> </table> </div> <!--hideend--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>CD Ladder</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell15">CD</th><th class="KJEHeading KJECell15">Term</th><th class="KJEHeading KJECell15">Rate</th><th class="KJEHeading KJECell15">APY</th><th class="KJEHeading KJECell20">Starting Amount</th><th class="KJEHeading KJECell20">Balance at Maturity</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <!--**CD_LADDER**--> </tbody> </table> </div> <BR> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>CD Ladder vs. Single Short-term Rollover CD</h2> **REPEATING GROUP** ';
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on data2.profitstarscms.com denmarkstate.com ramseybank.com www.centurybanknet.com foresightbank.com fnb-hartford.com

