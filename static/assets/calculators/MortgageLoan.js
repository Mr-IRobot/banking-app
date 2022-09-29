
KJE.MortgageLoanCalculation=function(){this.MSG_ERROR_MAPR=KJE.parameters.get("","KJE1 MAPR exceeds allowable maximum of 36%, adjust fees to reduce the calculated MAPR.");this.bMAPR=KJE.parameters.get("USE_MAPR",false);this.bTERMINMONTHS=KJE.parameters.get("TERM_IN_MONTHS",false);this.MSG_YEAR_NUMBER=KJE.parameters.get("MSG_YEAR_NUMBER","Year Number");this.MSG_POP_PRINCIPAL=KJE.parameters.get("MSG_POP_PRINCIPAL","Total Principal for");this.MSG_POP_INTEREST=KJE.parameters.get("MSG_POP_INTEREST","Total Interest for");this.MSG_PRINCIPAL=KJE.parameters.get("MSG_PRINCIPAL","Principal");this.MSG_INTEREST=KJE.parameters.get("MSG_INTEREST","Interest");this.MSG_PRINCIPAL_BALANCE=KJE.parameters.get("MSG_PRINCIPAL_BALANCE","Principal Balance");this.MSG_POP_PRINCIPAL_NORMAL=KJE.parameters.get("MSG_POP_PRINCIPAL_NORMAL","Principal Balance for Normal Payments Year");this.MSG_POP_PRINCIPAL_PREPAY=KJE.parameters.get("MSG_POP_PRINCIPAL_PREPAY","Principal Balance for Prepayments Year");this.MSG_PREPAYMENTS=KJE.parameters.get("MSG_PREPAYMENTS","Prepayments");this.MSG_NORMAL_PAYMENTS=KJE.parameters.get("MSG_NORMAL_PAYMENTS","Normal");this.MSG_PREPAY_MESSAGE=KJE.parameters.get("MSG_PREPAY_MESSAGE","Your planned prepayment(s) will shorten your mortgage by PREPAY_SHORTEN_TERM.");this.MSG_RETURN_PAYMENT=KJE.parameters.get("MSG_RETURN_PAYMENT","A loan amount of LOAN_AMOUNT at INTEREST_RATE for TERM years will give you a monthly payment (PI) of MONTHLY_PI.");this.MSG_ERROR_BALLOON=KJE.parameters.get("MSG_ERROR_BALLOON","Loan term must be less than the amortization term.");this.PITI_PERCENT=KJE.parameters.get("PITI_PERCENT",false);this.SHOW_PITI=KJE.parameters.get("SHOW_PITI",false);this.USE_OTHER_FEES_AMOUNT=KJE.parameters.get("USE_OTHER_FEES_AMOUNT",true);this.ADJUSTABLE_RATE=false;this.PMI_CALCULATE=KJE.parameters.get("PMI_CALCULATE",false);this.PMI_RATE=KJE.parameters.get("PMI_RATE",0.5);this.MONTHLY_PMI=KJE.parameters.getSet("MONTHLY_PMI",0);this.PMI_PERCENTAGE=KJE.parameters.get("PMI_PERCENTAGE",0.2);this.oldLOAN_AMOUNT=0;this.oldDOWNPAYMENT_20=0;this.OTHER_FEES_MAPR=KJE.FloatArray(5);this.sSchedule=new KJE.Repeating();this.sAdjSchedule=null};KJE.MortgageLoanCalculation.prototype.clear=function(){for(var a=0;a<this.OTHER_FEES_MAPR.length;a++){this.OTHER_FEES_MAPR[a]=0}this.ADJUSTABLE_RATE_CAP=0;this.ADJUSTABLE_RATE_FEQ=12;this.ADJUSTABLE_RATE_FIXED=0;this.ADJUSTABLE_RATE_INCR=0;this.BALLOON_PAYMENT=0;this.DISCOUNT_POINTS_PERCENT=0;this.FEDERAL_TAX_RATE=0;this.INFLATION_RATE=3;this.INTEREST_ONLY=false;this.INTEREST_RATE=0;this.LOAN_AMOUNT=0;this.MARGINAL_TAX_RATE=0;this.MSG_TERM="";this.ORIGINATION_FEES_PERCENT=0;this.OTHER_FEES=0;this.OTHER_FEES_RATE=0;this.PREPAY_AMOUNT=0;this.PREPAY_BALLOON_PAYMENT=0;this.PREPAY_STARTS_WITH=1;this.PREPAY_TYPE=KJE.Default.PREPAY_NONE;this.PURCHASE_PRICE=0;this.DOWNPAYMENT=0;this.RATE_INDEX=0;this.RATE_INDEX_MARGIN=0;this.RECAST_TO_AMORTIZE=1000000;this.SAVINGS_RATE=0;this.STATE_TAX_RATE=0;this.TERM=0;this.TERM_BALLOON=0;this.YEARS_IN_HOME=0;this.YEARLY_HOME_INSURANCE=0;this.YEARLY_PROPERTY_TAXES=0;this.MONTHLY_HOME_ASSOCIATION=0;this.BY_YEAR=true};KJE.MortgageLoanCalculation.prototype.calculate=function(h){var aH=KJE;var V=this.ADJUSTABLE_RATE_CAP;var aO=this.ADJUSTABLE_RATE_FEQ;var m=this.ADJUSTABLE_RATE_FIXED;var M=this.ADJUSTABLE_RATE_INCR;var b=this.ADJUSTABLE_RATE;var aK=this.BALLOON_PAYMENT;var bn=this.bTERMINMONTHS;var X=this.DISCOUNT_POINTS_PERCENT;var aW=this.FEDERAL_TAX_RATE;var D=this.INFLATION_RATE;var ad=this.INTEREST_ONLY;var a2=this.INTEREST_RATE;var a7=this.LOAN_AMOUNT;var P=this.MARGINAL_TAX_RATE;var at=this.ORIGINATION_FEES_PERCENT;var O=this.OTHER_FEES_RATE;var Y=this.OTHER_FEES;var a5=this.OTHER_FEES_MAPR;var Q=this.PREPAY_AMOUNT;var d=this.PREPAY_BALLOON_PAYMENT;var bc=this.PREPAY_STARTS_WITH;var w=this.PREPAY_TYPE;var ae=this.PURCHASE_PRICE;var a8=this.DOWNPAYMENT;var aC=this.RATE_INDEX_MARGIN;var t=this.RATE_INDEX;var aL=this.RECAST_TO_AMORTIZE;var k=this.SAVINGS_RATE;var Z=this.STATE_TAX_RATE;var ax=this.TERM_BALLOON;var W=this.TERM;var I=this.YEARLY_HOME_INSURANCE;var aF=this.YEARLY_PROPERTY_TAXES;var aj=this.YEARS_IN_HOME;var al=this.BY_YEAR;var N="";var S=0;var j="";var ba=0;var bk=0;var E=0;var p=0;var ah=0;var aB=0;var bg=0;var aP=0;var ak=0;var aS=0;var bb=0;var l=0;var o=0;var U=this.MONTHLY_PMI;var f=0;var aI=0;var bh;var e=0;var R=0;var a1=0;var bq="";var ag=0;var aT=0;var bj=0;var av=0;var a9=0;var bd=0;var bi=0;var bw=0;var ay=0;var bl=0;var bf=0;var c=0;var be=0;var T=0;var af=0;var g=0;var aV=KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE;var a8=this.DOWNPAYMENT;var ae=this.PURCHASE_PRICE;if(ae==0&&!this.PMI_CALCULATE){ae=a7}else{a7=ae-a8;if(a7<0){a7=0}}if(this.PITI_PERCENT&&this.SHOW_PITI){this.YEARLY_PROPERTY_TAXES=aH.round((this.YEARLY_PROPERTY_TAXES/100)*ae);this.YEARLY_HOME_INSURANCE=aH.round((this.YEARLY_HOME_INSURANCE/100)*ae)}var a6=ae*this.PMI_PERCENTAGE;if(this.PMI_CALCULATE&&(a6!=this.oldDOWNPAYMENT_20||a7!=this.oldLOAN_AMOUNT)){if(a6>a8){U=a7*(this.PMI_RATE/1200)}else{U=0}}this.oldLOAN_AMOUNT=a7;this.oldDOWNPAYMENT_20=a6;if(bn){this.MONTHS=af=W%12;this.TERM=W=Math.floor(W/12)}var y=this.TOTAL_MONTHS=af+W*12;if(P==0){P=((Z/100)*(1-aW/100))*100+aW}if(ad){l=aH.round((a2/1200*a7),2)}else{l=aH.round(KJE.PMT(a2/1200,W*12+af,a7),2)}N=this.MSG_RETURN_PAYMENT;if(aj==0){aj=W+(af/12)}else{if(aj>W){aj=W+(af/12)}}var J=aj*12;if(!this.USE_OTHER_FEES_AMOUNT){Y=aH.round((O/100)*a7,2)}E=aH.round((X/100)*a7,2);aI=aH.round((at/100)*a7,2);bw=E+aI+Y;var C=0;for(var aA=0;aA<a5.length;aA++){C+=a5[aA]}bw+=C;aS=(a7/ae);bb=aH.round(I/12,2);f=aH.round(aF/12,2);MONTHLY_HOME_ASSOCIATION=this.MONTHLY_HOME_ASSOCIATION;o=bb+f+MONTHLY_HOME_ASSOCIATION+l+U;ah=aH.round((a2/1200)*a7,2);aB=(ad?0:l-ah);var v=a2/1200;var aR=P/100;var B=k/1200;g=(t+aC)/100;if(b&&g!=a2/100&&g!=0){if(a7<=0){bl=0}else{bl=KJE.MortgageLoanCalculation.APRAdjustable(W*12+af,a7-(!this.bMAPR?0:bw),bw,a2/100,m,aO,g,M/100,V)}}else{if(a7<=0){bl=0}else{bl=KJE.APR(W*12+af,l,v,a7-(!this.bMAPR?0:bw),bw)*12}}bf=aH.round(KJE.PMT(v,W*12+af,a7+(this.bMAPR?0:bw)),2);c=a7+(this.bMAPR?0:bw);bi=(a2/100)*(1-(aR*(a7>aV?aV/a7:1)));be=(bl)*(1-(aR*(a7>aV?aV/a7:1)));ay=0;ak=0;var az=false;if(ax>0){if(ax>W){throw this.MSG_ERROR_BALLOON}az=true}if(ad&&aL<ax){ax=W;az=true}var aE=Math.round(az?ax:W)+1;var aA=0;var aJ=this.DS_PRINCIPAL_BAL=KJE.FloatArray(aE);var aD=this.DS_PREPAY_PRINCIPAL_BAL=KJE.FloatArray(aE);var aY=this.DS_INTEREST_PAID=KJE.FloatArray(aE);var a4=this.DS_PAYMENTS=KJE.FloatArray(aE);var z=new Array(aE);var x=true;var a0=aF;av=(w==KJE.Default.PREPAY_ONETIME&&bc==0?Q:0);var bp=a7-av;var aX=0;var aG=0;var bu=0;var F=0;var ar=0;var aZ=(ad?ah:l);var bm=0;var K=0;var aQ=a7;var aw=0;var aq=0;var A=0;var bv=0;var L=0;var aa=l;var a3=0;var bs=0;var bo=0;var u=0;var ab=0;var bt=0;if(w==KJE.Default.PREPAY_NONE){x=false}if(bc==0&&w!=KJE.Default.PREPAY_ONETIME){bc=1}var ap=0;z[ap]="0";aD[ap]=bp;aJ[ap]=a7;aY[ap]=0;a4[ap]=0;ap+=1;if(h){var am=this.sSchedule;am.clearRepeat();if(x){am.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:am.sReportCol("Regular Payment Schedule",10),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:am.sReportCol("Prepayment Payment Schedule",11),sFormat:"COLSPAN=3"})}if(!al&&x){am.addHeader(am.sReportCol("<BR><BR>Nbr",1),am.sReportCol("<BR><BR>Payment",2),am.sReportCol("<BR><BR>Interest",4),am.sReportCol("Ending<BR>Principal<BR>Balance",5),am.sReportCol("<BR><BR>Payment",2),am.sReportCol("<BR><BR>Interest",4),am.sReportCol("Ending<BR>Principal<BR>Balance",5))}else{if(!al&&!x){am.addHeader(am.sReportCol("<BR><BR>Nbr",1),am.sReportCol("<BR><BR>Payment",2),am.sReportCol("<BR><BR>Principal",3),am.sReportCol("<BR><BR>Interest",4),am.sReportCol("Ending<BR>Principal<BR>Balance",5))}else{if(al&&x){am.addHeader(am.sReportCol("<BR><BR>Yr ",6),am.sReportCol("<BR>Total<BR>Payments",7),am.sReportCol("<BR>Interest<BR>Paid",8),am.sReportCol("Ending<BR>Principal<BR>Balance",5),am.sReportCol("<BR>Total<BR>Payments",7),am.sReportCol("<BR>Interest<BR>Paid",8),am.sReportCol("Ending<BR>Principal<BR>Balance",5))}else{am.addHeader(am.sReportCol("<BR><BR>Year",6),am.sReportCol("<BR>Total<BR>Payments",7),am.sReportCol("<BR>Principal<BR>Paid",9),am.sReportCol("<BR>Interest<BR>Paid",8),am.sReportCol("Ending<BR>Principal<BR>Balance",5))}}}if(x){am.addRepeat("&nbsp;","&nbsp;","&nbsp;",aH.dollars(aQ,2),(w==KJE.Default.PREPAY_ONETIME&&bc==0?aH.dollars(Q,2):""),"&nbsp;","&nbsp;",aH.dollars(bp,2))}else{am.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",aH.dollars(aQ,2))}}ba=l;var aN=l;var ac=l;var br=a2/100;var ao=a2/100;var aU=0;if(b&&M!=0){if(this.sAdjSchedule==null){this.sAdjSchedule=new KJE.Repeating()}var H=this.sAdjSchedule;H.clearRepeat();H.addHeader(H.sReportCol("Payment Number",12),H.sReportCol("Interest Rate",13),H.sReportCol("Monthly Payment",14));H.addRepeat("1",aH.percent(ao,2),aH.dollars(l,2))}var G=(az?ax*12:W*12+af);for(var au=1;au<=G;au++){aA=au-1;aZ=aN;aa=ac;bm=0;a3=0;if(x&&(bc<=au)){if(w==KJE.Default.PREPAY_ONETIME&&bc==au){bm=Q}else{if(w==KJE.Default.PREPAY_YEARLY){if(((au-bc)%12)==0){bm=Q}}else{if(w==KJE.Default.PREPAY_MONTHLY){bm=Q}}}}aw=aH.round(v*aQ,2);if(ad&&au<=aL){aa=aw}bo=aH.round(v*(aQ>aV?aV:aQ),2);aq=(ad&&au<aL?0:aa-aw);aQ-=aq;if(aQ==0){aa=0;aq=0;aw=0}else{if(aQ<0||(aQ>0.005&&G==au&&!az)){aq+=aQ;aQ=0;aa=aq+aw}else{if(G==au&&!az){aQ=0}}}aX=aH.round(v*bp,2);if(ad&&au<=aL){aZ=aX}u=aH.round(v*(bp>aV?aV:bp),2);if(ad&&au<aL){if(bp==0){aZ=0;aG=0;aX=0;bm=0}else{aG=aZ-aX;bp-=aG+bm;if(bp<0){bm+=bp;bp=0}}}else{aG=aZ-aX;bp-=aG+bm;if(bp==0){aZ=0;aG=0;aX=0;bm=0}else{if(bp<0){bm+=bp;if(bm<0){aG+=bm;bm=0}bp=0;aZ=aG+aX}else{if(bp>0.005&&G==au&&!az){aG+=bp;bp=0;aZ=aG+aX}else{if(G==au&&!az){bp=0}}}}}if(aZ<0){aZ=0}if(bp==0&&aT==0){ag=au;aT=W*12+af-au}bu+=aX;ab+=u;F+=aG;ar+=aZ;K+=bm;av+=aZ+bm;R+=aX;A+=aw;bt+=bo;bv+=aq;L+=aa;ay+=aa;ak+=aw;if((au%12)==0){if(au==12){bg=A;e=bu;aP=(P/100*(E+bt+a0));a3=aP}else{a0*=1+D;a3=((P/100)*(bt+a0))}bs+=a3;bt=0;ab=0;a3=0}if(az&&G==au){aK=aQ+aa;aQ=0;d=bp+aZ+bm;bp=0;ay-=aa;av-=bm+aZ}if(!al&&h){if(x){am.addRepeat(aH.number(au),aH.dollars((az&&G==au?aK:aa),2),aH.dollars(aw,2),aH.dollars(aQ,2),aH.dollars((az&&G==au?d:bm+aZ),2),aH.dollars(aX,2),aH.dollars(bp,2))}else{am.addRepeat(aH.number(au),aH.dollars((az&&G==au?aK:aa),2),aH.dollars((az&&G==au?aK-aw:aq),2),aH.dollars(aw,2),aH.dollars(aQ,2))}}if((au%12)==0){z[ap]=""+ap;if(az&&G==au){aD[ap]=d;aJ[ap]=aK}else{aD[ap]=bp;aJ[ap]=aQ}aY[ap]=A;a4[ap]=(az&&G==au?aK-aa+L:L);ap+=1;if(al&&h){if(x){am.addRepeat(aH.number(au/12),aH.dollars((az&&G==au?aK-aa+L:L),2),aH.dollars(A,2),aH.dollars(aQ,2),aH.dollars((az&&G==au?d-bm-aZ+ar+K:ar+K),2),aH.dollars(bu,2),aH.dollars(bp,2))}else{am.addRepeat(aH.number((au/12)),aH.dollars((az&&G==au?aK-aa+L:L),2),aH.dollars((az&&G==au?aK+bv-aw-aq:bv),2),aH.dollars(A,2),aH.dollars(aQ,2))}}A=0;bt=0;bv=0;L=0;bu=0;ab=0;F=0;ar=0;K=0}if((au==aL)||((au<m?1:(au-m)%aO)==0&&au!=1&&b&&au!=W*12+af&&M!=0&&au>=m)){ao+=M/100;if(ao>V/100){ao=V/100}if(ao<0.02){ao=0.02}if(ao!=br||(au==aL)){br=ao;v=ao/12;aN=aH.round(KJE.PMT(v,W*12+af-au,bp),2);ac=aH.round(KJE.PMT(v,W*12+af-au,aQ),2);if(S==0){S=ac}T=ac;if(ba<ac){ba=ac}if(b&&M!=0){H.addRepeat(au+1,aH.percent(ao,2),aH.dollars(ac,2))}}}}if(b&&M!=0){j=H.getRepeat();H.clearRepeat()}this.PREPAY_SHORTEN_TOTAL_MONTHS=aT;bj=(aT/12);aT=(aT%12);bq=this.MSG_PREPAY_MESSAGE;bk=(bs/(W+af/12));p=aQ;bh=bp;av=R+a7-bh;ay=ak+a7-p;var an=1;if(x){an=2}var aM=this.DS_INTEREST=new Array(an);var a=this.DS_PRINCIPAL=new Array(an);var ai=this.totalpaid_cats=new Array(an);aM[0]=ak;a[0]=a7-p;ai[0]=this.MSG_NORMAL_PAYMENTS;if(x){aM[1]=R;a[1]=a7-bh;ai[1]=this.MSG_PREPAYMENTS;a1=ak-R}this.cats=z;this.sReturnMessage=N;this.MARGINAL_TAX_RATE=P;this.ADJUSTABLE_AFTER_FIRST_ADJ=S;this.ADJUSTABLE_PAYMENT_AMTS=j;this.ADJUSTABLE_RATE_HIGHEST=ba;this.AVG_TAX_SAVINGS=bk;this.DISCOUNT_POINTS_AMT=E;this.ENDING_BALANCE=p;this.FIRST_MONTH_INTEREST=ah;this.FIRST_MONTH_PRINCIPAL=aB;this.FIRST_YEAR_INTEREST=bg;this.FIRST_YEAR_TAX_SAVINGS=aP;this.FULLY_INDEX_RATE=g;this.FULLY_INDEXED_PAYMENT=T;this.INTEREST_PAID=ak;this.LOAN_APR=bl;this.LOAN_APR_AFT=be;this.LOAN_APR_AMOUNT=c;this.LOAN_APR_PAYMENT=bf;this.LOAN_TO_VALUE=aS;this.MONTHLY_HOME_INSURANCE=bb;this.MONTHLY_PI=l;this.MONTHLY_PITI=o;this.MONTHLY_PROPERTY_TAXES=f;this.MONTHLY_HOME_ASSOCIATION=MONTHLY_HOME_ASSOCIATION;this.MONTHS=af;this.ORIGINATION_FEES_AMT=aI;this.PREPAY_ENDING_BALANCE=bh;this.PREPAY_FIRST_YEAR_INTEREST=e;this.PREPAY_INTEREST_PAID=R;this.PREPAY_INTEREST_SAVINGS=a1;this.PREPAY_MESSAGE=bq;this.PREPAY_PAYOFF_MONTHS=ag;this.PREPAY_SHORTEN_MONTHS=aT;this.PREPAY_SHORTEN_YEARS=bj;this.PREPAY_TOTAL_OF_PAYMENTS=av;this.PREPAY_TOTAL_VALUE=a9;this.PREPAY_TOTAL_VALUE_AFTX=bd;this.TAX_ADJ_RATE=bi;this.TOTAL_CLOSING_COSTS=bw;this.TOTAL_OF_PAYMENTS=ay;this.OTHER_FEES=Y;this.BALLOON_PAYMENT=aK;this.PREPAY_BALLOON_PAYMENT=d;this.REGULAR_PAYMENTS=aH.input(this.TERM_BALLOON*12-1);this.MONTHLY_PMI=U;this.MONTH_PMI_EXEMPT=(a8>=a6);this.LOAN_AMOUNT=a7;if(this.bMAPR>0){if(bl>0.36){throw KJE.replace("KJE1",aH.percent(bl,3),this.MSG_ERROR_MAPR)}}};KJE.MortgageLoanCalculation.prototype.formatReport=function(b){var c=KJE;var d=b;for(var a=0;a<this.OTHER_FEES_MAPR.length;a++){d=KJE.replace("OTHER_FEES_MAPR"+(a+1),c.dollars(this.OTHER_FEES_MAPR[a],2),d)}d=KJE.replace("FIXED_YEARS",c.number(this.ADJUSTABLE_RATE_FIXED/12),d);d=KJE.replace("ADJUSTABLE_YEARS",c.number(this.TERM+this.MONTHS/12-this.ADJUSTABLE_RATE_FIXED/12),d);d=KJE.replace("RECAST_TO_AMORTIZE_YEARS",c.number(this.RECAST_TO_AMORTIZE/12),d);d=KJE.replace("RECAST_TO_AMORTIZE",c.number(this.RECAST_TO_AMORTIZE),d);d=KJE.replace("REMAIN_AFTER_AMORTIZE",c.number(this.TERM*12+this.MONTHS-this.RECAST_TO_AMORTIZE),d);d=KJE.replace("MSG_TERM",this.MSG_TERM,d);d=KJE.replace("RESULT_MESSAGE",this.sReturnMessage,d);d=KJE.replace("YEARS_IN_HOME",c.number(this.YEARS_IN_HOME),d);d=KJE.replace("YEARLY_PROPERTY_TAXES",c.dollars(this.YEARLY_PROPERTY_TAXES,2),d);d=KJE.replace("YEARLY_HOME_INSURANCE",c.dollars(this.YEARLY_HOME_INSURANCE,2),d);d=KJE.replace("TOTAL_CLOSING_COSTS",c.dollars(this.TOTAL_CLOSING_COSTS,2),d);d=KJE.replace("TERM_BALLOON",c.number(this.TERM_BALLOON),d);if(this.MONTHS>0){d=KJE.replace("TERM",c.number(this.TERM*12+this.MONTHS),d);d=KJE.replace("years","months",d)}else{d=KJE.replace("TERM",c.number(this.TERM),d)}d=KJE.replace("TAX_ADJ_RATE",c.percent(this.TAX_ADJ_RATE,3),d);d=KJE.replace("SAVINGS_RATE",c.percent(this.SAVINGS_RATE/100,3),d);d=KJE.replace("PURCHASE_PRICE",c.dollars(this.PURCHASE_PRICE,2),d);d=KJE.replace("DOWNPAYMENT",c.dollars(this.DOWNPAYMENT,2),d);d=KJE.replace("ADJUSTABLE_RATE_FEQ",c.number(this.ADJUSTABLE_RATE_FEQ),d);d=KJE.replace("ADJUSTABLE_RATE_INCR",c.percent(this.ADJUSTABLE_RATE_INCR/100,2),d);d=KJE.replace("ADJUSTABLE_RATE_CAP",c.percent(this.ADJUSTABLE_RATE_CAP/100,3),d);d=KJE.replace("ADJUSTABLE_PAYMENT_AMTS",this.ADJUSTABLE_PAYMENT_AMTS,d);d=KJE.replace("ADJUSTABLE_RATE_HIGHEST",c.dollars(this.ADJUSTABLE_RATE_HIGHEST,2),d);d=KJE.replace("ADJUSTABLE_AFTER_FIRST_ADJ",c.dollars(this.ADJUSTABLE_AFTER_FIRST_ADJ,2),d);d=KJE.replace("ADJUSTABLE_RATE_FIXED",c.number(this.ADJUSTABLE_RATE_FIXED),d);d=KJE.replace("RATE_INDEX_MARGIN",c.percent(this.RATE_INDEX_MARGIN/100,3),d);d=KJE.replace("RATE_INDEX",c.percent(this.RATE_INDEX/100,3),d);d=KJE.replace("ADJUSTABLE_RATE",c.yesno(this.ADJUSTABLE_RATE),d);d=KJE.replace("REGULAR_PAYMENTS",this.REGULAR_PAYMENTS,d);if(this.PREPAY_TYPE==KJE.Default.PREPAY_NONE){d=KJE.replace("PREPAY_MESSAGE","",d);d=KJE.replace("PREPAY_TYPE",this.PREPAY_TYPE,d);d=KJE.replace("PREPAY_TOTAL_VALUE_AFTX","",d);d=KJE.replace("PREPAY_TOTAL_VALUE","",d);d=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS","",d);d=KJE.replace("PREPAY_SHORTEN_TERM","",d);d=KJE.replace("PREPAY_STARTS_WITH","",d);d=KJE.replace("PREPAY_SHORTEN_YEARS","",d);d=KJE.replace("PREPAY_SHORTEN_MONTHS","",d);d=KJE.replace("PREPAY_INTEREST_SAVINGS","",d);d=KJE.replace("PREPAY_INTEREST_PAID","",d);d=KJE.replace("PREPAY_FIRST_YEAR_INTEREST","",d);d=KJE.replace("PREPAY_AMOUNT","",d);d=KJE.replace("PREPAY_ENDING_BALANCE","",d);d=KJE.replace("PREPAY_BALLOON_PAYMENT","",d);d=KJE.replace("PREPAY_PAYOFF_PERIODS","",d)}else{d=KJE.replace("PREPAY_MESSAGE",this.PREPAY_MESSAGE,d);d=KJE.replace("PREPAY_TYPE",KJE.Default.PREPAY_PERIODS[this.PREPAY_TYPE],d);d=KJE.replace("PREPAY_TOTAL_VALUE_AFTX",c.dollars(this.PREPAY_TOTAL_VALUE_AFTX,2),d);d=KJE.replace("PREPAY_TOTAL_VALUE",c.dollars(this.PREPAY_TOTAL_VALUE,2),d);d=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS",c.dollars(this.PREPAY_TOTAL_OF_PAYMENTS,2),d);d=KJE.replace("PREPAY_STARTS_WITH",c.number(this.PREPAY_STARTS_WITH),d);d=KJE.replace("PREPAY_SHORTEN_TERM",KJE.getTermLabel(this.PREPAY_SHORTEN_TOTAL_MONTHS),d);d=KJE.replace("PREPAY_SHORTEN_YEARS",c.number(this.PREPAY_SHORTEN_YEARS),d);d=KJE.replace("PREPAY_SHORTEN_MONTHS",c.number(this.PREPAY_SHORTEN_MONTHS),d);d=KJE.replace("PREPAY_INTEREST_SAVINGS",c.dollars(this.PREPAY_INTEREST_SAVINGS,2),d);d=KJE.replace("PREPAY_INTEREST_PAID",c.dollars(this.PREPAY_INTEREST_PAID,2),d);d=KJE.replace("PREPAY_FIRST_YEAR_INTEREST",c.dollars(this.PREPAY_FIRST_YEAR_INTEREST,2),d);d=KJE.replace("PREPAY_AMOUNT",c.dollars(this.PREPAY_AMOUNT,2),d);d=KJE.replace("PREPAY_ENDING_BALANCE",c.dollars(this.PREPAY_ENDING_BALANCE,2),d);d=KJE.replace("PREPAY_BALLOON_PAYMENT",c.dollars(this.PREPAY_BALLOON_PAYMENT,2),d);d=KJE.replace("PREPAY_PAYOFF_PERIODS",KJE.getTermLabel(this.PREPAY_PAYOFF_MONTHS),d)}d=KJE.replace("OTHER_FEES",c.dollars(this.OTHER_FEES,2),d);d=KJE.replace("ORIGINATION_FEES_PERCENT",c.percent(this.ORIGINATION_FEES_PERCENT/100,2),d);d=KJE.replace("ORIGINATION_FEES_AMT",c.dollars(this.ORIGINATION_FEES_AMT,2),d);d=KJE.replace("MONTHLY_PROPERTY_TAXES",c.dollars(this.MONTHLY_PROPERTY_TAXES,2),d);d=KJE.replace("MONTHLY_HOME_ASSOCIATION",c.dollars(this.MONTHLY_HOME_ASSOCIATION,2),d);d=KJE.replace("MONTHLY_PITI",c.dollars(this.MONTHLY_PITI,2),d);d=KJE.replace("MONTHLY_PMI",c.dollars(this.MONTHLY_PMI,2),d);d=KJE.replace("MONTHLY_PI",c.dollars(this.MONTHLY_PI,2),d);d=KJE.replace("MONTHLY_HOME_INSURANCE",c.dollars(this.MONTHLY_HOME_INSURANCE,2),d);d=KJE.replace("MARGINAL_TAX_RATE",c.percent(this.MARGINAL_TAX_RATE/100,2),d);d=KJE.replace("FEDERAL_TAX_RATE",c.percent(this.FEDERAL_TAX_RATE/100,2),d);d=KJE.replace("STATE_TAX_RATE",c.percent(this.STATE_TAX_RATE/100,2),d);d=KJE.replace("LOAN_TO_VALUE",c.percent(this.LOAN_TO_VALUE,2),d);d=KJE.replace("LOAN_APR_AFT",c.percent(this.LOAN_APR_AFT,3),d);d=KJE.replace("LOAN_APR_PAYMENT",c.dollars(this.LOAN_APR_PAYMENT,2),d);d=KJE.replace("LOAN_APR_AMOUNT",c.dollars(this.LOAN_APR_AMOUNT,2),d);d=KJE.replace("LOAN_APR",c.percent(this.LOAN_APR,3),d);d=KJE.replace("LOAN_AMOUNT",c.dollars(this.LOAN_AMOUNT,2),d);d=KJE.replace("INTEREST_RATE",c.percent(this.INTEREST_RATE/100,3),d);d=KJE.replace("INTEREST_PAID",c.dollars(this.INTEREST_PAID,2),d);d=KJE.replace("INFLATION_RATE",c.percent(this.INFLATION_RATE/100,2),d);d=KJE.replace("FIRST_YEAR_TAX_SAVINGS",c.dollars(this.FIRST_YEAR_TAX_SAVINGS,2),d);d=KJE.replace("FIRST_YEAR_INTEREST",c.dollars(this.FIRST_YEAR_INTEREST,2),d);d=KJE.replace("FIRST_MONTH_PRINCIPAL",c.dollars(this.FIRST_MONTH_PRINCIPAL,2),d);d=KJE.replace("FIRST_MONTH_INTEREST",c.dollars(this.FIRST_MONTH_INTEREST,2),d);d=KJE.replace("DISCOUNT_POINTS_PERCENT",c.number(this.DISCOUNT_POINTS_PERCENT,2),d);d=KJE.replace("DISCOUNT_POINTS_AMT",c.dollars(this.DISCOUNT_POINTS_AMT,2),d);d=KJE.replace("AVG_TAX_SAVINGS",c.dollars(this.AVG_TAX_SAVINGS,2),d);d=KJE.replace("TOTAL_OF_PAYMENTS",c.dollars(this.TOTAL_OF_PAYMENTS,2),d);d=KJE.replace("ENDING_BALANCE",c.dollars(this.ENDING_BALANCE,2),d);d=KJE.replace("BALLOON_PAYMENT",c.dollars(this.BALLOON_PAYMENT,2),d);d=KJE.replace("FULLY_INDEXED_PAYMENT",c.dollars(this.FULLY_INDEXED_PAYMENT,2),d);d=KJE.replace("MORTGAGE_TAX_DEDUCT_MAX_BALANCE",c.dollars(KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE),d);d=KJE.replace("INTEREST_ONLY",c.yesno(this.INTEREST_ONLY?1:0),d);d=KJE.replace("CHECKBOX_BY_MONTH",(this.BY_YEAR?"":"CHECKED"),d);d=KJE.replace("CHECKBOX_BY_YEAR",(this.BY_YEAR?"CHECKED":""),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.MortgageLoanCalculation.prototype.getCategories=function(){return this.cats};KJE.MortgageLoanCalculation.prototype.getAmountPaidCategories=function(){return this.totalpaid_cats};KJE.MortgageLoanCalculation.APRAdjustable=function(t,q,d,k,s,j,c,f,l){var b=q;var p=k/12;var r=p;var h=KJE.PMT(p,t,b);var g=0;var e=new Array();e[0]=Math.round(100*(-q+d));for(var o=1;o<=t;o++){b-=h-(p*b);g+=h;e[o]=Math.round(100*h);if((o<s?1:(o-s)%j)==0&&o!=1&&o!=t){var m=c/12;if(m>(r+f)){m=r+f}if(m>l/12){m=l/12}if(m!=r){r=m;p=m;h=KJE.PMT(p,t-o,b)}}}var a=(c>k?c:k);return(KJE.MortgageLoanCalculation.IRR(e,a/12)*12)};KJE.MortgageLoanCalculation.IRR=function(f,e){var c=e/2;var b;var d=f.length;while(true){b=0;for(var a=0;a<d;a++){b+=f[a]/Math.pow((1+e),a)}if(b>-1&&b<1){break}e+=(b>0?c:-c);c=c/2}return e};KJE.Default.MORTGAGE_TAX_DEDUCT_MAX_BALANCE=750000;KJE.Default.PREPAY_NONE=0;KJE.Default.PREPAY_WEEKLY=1;KJE.Default.PREPAY_BIWEEKLY=2;KJE.Default.PREPAY_2XMONTHLY=3;KJE.Default.PREPAY_MONTHLY=4;KJE.Default.PREPAY_YEARLY=5;KJE.Default.PREPAY_ONETIME=6;KJE.Default.PREPAY_FREQUENCY=[0,52,26,24,12,1,0];KJE.Default.getPrepayDrop=function(c,b,g){KJE.Default.PREPAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PREPAY_PERIOD_ID",[KJE.Default.PREPAY_NONE,KJE.Default.PREPAY_MONTHLY,KJE.Default.PREPAY_YEARLY,KJE.Default.PREPAY_ONETIME]);KJE.Default.PREPAY_PERIODS=KJE.parameters.get("ARRAY_PREPAY_PERIODS",[KJE.parameters.get("MSG_PREPAY_NONE","none"),"Weekly","bi-weekly","semi-monthly",KJE.parameters.get("MSG_PREPAY_MONTHLY","monthly"),KJE.parameters.set("MSG_PREPAY_YEARLY","yearly"),KJE.parameters.get("MSG_PREPAY_ONETIME","one-time")]);var a=KJE.Default.PREPAY_PERIOD_IDs;var f=a.length;var e=KJE.Default.PREPAY_PERIODS;var d=new Array(f);for(i=0;i<f;i++){d[i]=e[a[i]]}return KJE.getDropBox(c,KJE.parameters.get(c,(!b?KJE.Default.PAY_LOAN_IDs:b)),a,d,g)};KJE.CalcName="Mortgage Calculator";KJE.CalcType="mortgagecalculator";KJE.CalculatorTitleTemplate="Monthly payment is KJE1";KJE.parseInputs=function(a){a=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",30),a);if(KJE.Default.getPrepayDrop){a=KJE.replace("**PREPAY_TYPE**",KJE.Default.getPrepayDrop("PREPAY_TYPE",KJE.Default.PREPAY_NONE),a)}return a};KJE.initialize=function(){KJE.CalcControl=new KJE.MortgageLoanCalculation();KJE.GuiControl=new KJE.MortgageLoan(KJE.CalcControl)};KJE.MortgageLoan=function(k){var e=KJE;var h=KJE.inputs.items;this.MSG_GRAPHTOTAL_SUBTITLE1=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE1","Total Interest KJE1");this.MSG_GRAPHTOTAL_SUBTITLE2=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE2","Prepayment Interest Savings KJE1");this.MSG_GRAPHPAYMENTS_SUBTITLE1=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE1","Principal Balances by Year");this.MSG_GRAPHPAYMENTS_SUBTITLE2=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE2","Prepayment Term KJE1");KJE.MortgageAmtSlider("LOAN_AMOUNT","Mortgage amount");KJE.MortgageTermDropBoxSlider("TERM","Term in years");KJE.NumberSlider("TERM_MONTHS","Term in months",KJE.parameters.get("TERM_MONTHS_MIN",0),KJE.parameters.get("TERM_MONTHS_MAX",480));if(k.bTERMINMONTHS){h.TERM.hide()}else{h.TERM_MONTHS.hide()}KJE.MortgageRateSlider("INTEREST_RATE","Interest rate");KJE.DropBox("PREPAY_TYPE","Prepayment type");KJE.Label("MONTHLY_PAYMENT",k.SHOW_PITI?"Monthly payment (PI)":"Monthly payment",null,null,"KJEBold");KJE.NumberSlider("PREPAY_STARTS_WITH","Start with payment",0,KJE.Default.MortgageTermMax*12);KJE.Slider("PREPAY_AMOUNT","Prepayment amount",0,10000000,2,e.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");if(k.SHOW_PITI){KJE.Slider("YEARLY_PROPERTY_TAXES","Annual property taxes",0,10000000,0,e.FMT_DOLLARS,0,KJE.s_label[1],KJE.useScale(1));KJE.Slider("YEARLY_HOME_INSURANCE","Annual home insurance",0,10000000,0,e.FMT_DOLLARS,0,KJE.s_label[1],KJE.useScale(1));KJE.Slider("MONTHLY_HOME_ASSOCIATION","Monthly HOA fee",0,100000,0,e.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.Label("MONTHLY_PITI","Monthly payment (PITI)",null,null,"KJEBold")}KJE.DollarSlider("MONTHLY_PMI","Monthly PMI",0,100000,2,e.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));if(k.PMI_CALCULATE&&!KJE.parameters.get("PMI_SHOW",false)){h.MONTHLY_PMI.hide()}KJE.MortgageAmtSlider("PURCHASE_PRICE","Purchase price");KJE.MortgageAmtSlider("DOWNPAYMENT","Down payment");KJE.Label("LOAN_AMOUNT_CALCULATED","Loan amount",null,null,"KJEBold");var a=KJE.parameters.get("MSG_DROPPER_TITLE","Loan information: ");var c=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 loan for KJE2 years at KJE3");var m=KJE.parameters.get("MSG_PREPAY_IMMEDIATE","starting immediately");var f=KJE.parameters.get("MSG_DROPPER_PREPAYMENTS","Prepayments:");var b=KJE.parameters.get("MSG_DROPPER_PREPAYMENTSCLOSE","KJE1");var d=function(){return a+KJE.subText(KJE.getKJEReplaced(c,e.dollars(k.LOAN_AMOUNT),e.number(k.TERM),e.percent(k.INTEREST_RATE/100,3)),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",true,a,d),KJE.colorList[0]);var n=function(){if(h.PREPAY_TYPE.getValue()==KJE.Default.PREPAY_NONE){return f+KJE.subText(KJE.Default.PREPAY_PERIODS[KJE.Default.PREPAY_NONE],"KJECenter")}else{var l=h.PREPAY_STARTS_WITH.getFormatted();return f+KJE.subText(h.PREPAY_AMOUNT.getFormatted()+" "+h.PREPAY_TYPE.getFormatted().toLowerCase()+" "+(h.PREPAY_STARTS_WITH.getValue()<1?m:h.PREPAY_STARTS_WITH.getName().toLowerCase()+" "+h.PREPAY_STARTS_WITH.getFormatted()),"KJECenter")}};KJE.addDropper(new KJE.Dropper("PREPAY",false,f,n),KJE.colorList[0]);var g=KJE.gNewGraph(KJE.gSTACKED,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Total Payments KJE1<div class='KJESubTitle'>KJE2</div>"));g._legend._iOrientation=(KJE.gLegend.TOP_RIGHT);g._titleYAxis.setText(KJE.sCurrency);g._showItemLabel=false;var j=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Mortgage Term KJE1<div class='KJESubTitle'>KJE2</div>"));j._legend._iOrientation=KJE.gLegend.GRID_TOP_RIGHT;j._iArea=KJE.gGraphLine.AREA_ALL};KJE.MortgageLoan.prototype.setValues=function(b){var a=KJE.inputs.items;b.LOAN_AMOUNT=a.LOAN_AMOUNT.getValue();b.PURCHASE_PRICE=a.PURCHASE_PRICE.getValue();b.DOWNPAYMENT=a.DOWNPAYMENT.getValue();if(b.bTERMINMONTHS){b.TERM=a.TERM_MONTHS.getValue()}else{b.TERM=a.TERM.getValue()}b.INTEREST_RATE=a.INTEREST_RATE.getValue();b.PREPAY_TYPE=a.PREPAY_TYPE.getValue();b.PREPAY_AMOUNT=a.PREPAY_AMOUNT.getValue();b.PREPAY_STARTS_WITH=a.PREPAY_STARTS_WITH.getValue();b.BY_YEAR=a.BY_YEAR.getValue();if(b.SHOW_PITI){b.YEARLY_PROPERTY_TAXES=a.YEARLY_PROPERTY_TAXES.getValue();b.YEARLY_HOME_INSURANCE=a.YEARLY_HOME_INSURANCE.getValue();b.MONTHLY_HOME_ASSOCIATION=a.MONTHLY_HOME_ASSOCIATION.getValue()}b.MONTHLY_PMI=a.MONTHLY_PMI.getValue();if(b.PREPAY_TYPE==KJE.Default.PREPAY_NONE){a.PREPAY_AMOUNT.disable();a.PREPAY_STARTS_WITH.disable()}else{a.PREPAY_AMOUNT.enable();a.PREPAY_STARTS_WITH.enable()}};KJE.MortgageLoan.prototype.refresh=function(e){var b=KJE.inputs.items;var d=KJE;var a=KJE.gGraphs[0];var c=KJE.gGraphs[1];KJE.setTitleTemplate(d.dollars(e.SHOW_PITI?e.MONTHLY_PITI:e.MONTHLY_PI,2));a.removeAll();a.setGraphCategories(e.getAmountPaidCategories());if(e.PREPAY_TYPE==KJE.Default.PREPAY_NONE){a.setTitleTemplate(d.dollars(e.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE1,d.dollars(e.INTEREST_PAID)));a._axisX.setVisible(false)}else{a.setTitleTemplate(d.dollars(e.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE2,d.dollars(e.PREPAY_INTEREST_SAVINGS)));a._axisX.setVisible(true)}a.add(new KJE.gGraphDataSeries(e.DS_INTEREST,e.MSG_INTEREST,a.getColor(1),"",e.MSG_POP_INTEREST));a.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL,e.MSG_PRINCIPAL,a.getColor(2),"",e.MSG_POP_PRINCIPAL));a.paint();c.removeAll();c._titleXAxis.setText(e.MSG_YEAR_NUMBER);c.setGraphCategories(e.getCategories());if(e.PREPAY_TYPE==KJE.Default.PREPAY_NONE){c.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL_BAL,e.MSG_NORMAL_PAYMENTS,c.getColor(1),"",e.MSG_POP_PRINCIPAL_NORMAL+" "));c.setTitleTemplate(KJE.getTermLabel(e.TOTAL_MONTHS),this.MSG_GRAPHPAYMENTS_SUBTITLE1);c._legend.setVisible(false)}else{c.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL_BAL,e.MSG_NORMAL_PAYMENTS,c.getColor(1),"",e.MSG_POP_PRINCIPAL_NORMAL+" "));c.add(new KJE.gGraphDataSeries(e.DS_PREPAY_PRINCIPAL_BAL,e.MSG_PREPAYMENTS,c.getColor(2),"",e.MSG_POP_PRINCIPAL_PREPAY+" "));c.setTitleTemplate(KJE.getTermLabel(e.TOTAL_MONTHS),KJE.getKJEReplaced(this.MSG_GRAPHPAYMENTS_SUBTITLE2,KJE.getTermLabel(e.PREPAY_PAYOFF_MONTHS)));c._legend.setVisible(true)}c.paint();b.LOAN_AMOUNT_CALCULATED.setText(d.dollars(e.LOAN_AMOUNT,2));b.MONTHLY_PAYMENT.setText(d.dollars(e.MONTHLY_PI,2));if(e.SHOW_PITI){b.MONTHLY_PITI.setText(d.dollars(e.MONTHLY_PITI,2))}b.MONTHLY_PMI.setValue(d.round(e.MONTHLY_PMI,2),true);if(e.MONTH_PMI_EXEMPT){b.MONTHLY_PMI.disable()}else{b.MONTHLY_PMI.enable()}};KJE.InputScreenText=' <div id=KJE-D-INPUTS class="collapsible"> <div id=KJE-P-INPUTS>Mortgage information:</div></div> <div id=KJE-E-INPUTS > <div id="KJE-C-LOAN_AMOUNT"><input id="KJE-LOAN_AMOUNT" /></div> <div id="KJE-C-TERM">**TERM**</div> <div id="KJE-C-TERM_MONTHS"><input id=\'KJE-TERM_MONTHS\' /></div> <div id="KJE-C-INTEREST_RATE"><input id="KJE-INTEREST_RATE" /></div> <div id="KJE-C-MONTHLY_PAYMENT"><div id="KJE-MONTHLY_PAYMENT"></div></div> <div id="KJE-C-BY_YEAR"><fieldset id=\'KJE-FS-BY_YEAR\'><input id="KJE-BY_YEAR1" type=radio name=BY_YEAR /><input id="KJE-BY_YEAR2" type=radio name=BY_YEAR /></fieldset></div> <div style="height:10px"></div> </div> <div id=KJE-D-PREPAY class="collapsible"><div id=KJE-P-PREPAY>Prepayment information</div></div> <div id=KJE-E-PREPAY > <div id="KJE-C-PREPAY_TYPE">**PREPAY_TYPE**</div> <div id="KJE-C-PREPAY_AMOUNT"><input id="KJE-PREPAY_AMOUNT" /></div> <div id="KJE-C-PREPAY_STARTS_WITH"><input id="KJE-PREPAY_STARTS_WITH" /></div> <div style="height:10px"></div></div> **GRAPH1** **GRAPH2** ';KJE.DefinitionText=' <div id="KJE-D-LOAN_AMOUNT" ><dt>Mortgage amount</dt><dd>Original or expected balance for your mortgage.</div> <div id="KJE-D-TERM" ><dt>Term in years</dt><dd>The number of years over which you will repay this loan. The most common mortgage terms are 15 years and 30 years.</div> <div id="KJE-D-INTEREST_RATE" ><dt>Interest rate</dt><dd>Annual fixed interest rate for this mortgage. Please note that the interest rate is different from the Annual Percentage Rate (APR), which includes other expenses such as mortgage insurance, and the origination fee and or point(s), which were paid when the mortgage was first originated. The APR is normally higher than the simple interest rate.</div> <div id="KJE-D-MONTHLY_PAYMENT" ><dt>Monthly payment</dt><dd>Monthly principal and interest payment (PI).</div> <div id="KJE-D-TOTAL_PAYMENTS" ><dt>Total payments</dt><dd>Total of all monthly payments over the full term of the mortgage. This total payment amount assumes that there are no prepayments of principal.</div> <div id="KJE-D-TOTAL_INTEREST" ><dt>Total interest</dt><dd>Total of all interest paid over the full term of the mortgage. This total interest amount assumes that there are no prepayments of principal.</div> <div id="KJE-D-PREPAY_TYPE" ><dt>Prepayment type</dt><dd>The frequency of prepayment. The options are none, monthly, yearly and one-time payment.</div> <div id="KJE-D-PREPAY_AMOUNT" ><dt>Prepayment amount</dt><dd>Amount that will be prepaid on your mortgage. This amount will be applied to the mortgage principal balance, based on the prepayment type.</div> <div id="KJE-D-PREPAY_STARTS_WITH" ><dt>Start with payment</dt><dd>This is the payment number that your prepayments will begin with. For a one-time payment, this is the payment number that the single prepayment will be included in. All prepayments of principal are assumed to be received by your lender in time to be included in the following month\'s interest calculation. If you choose to prepay with a one-time payment for payment number zero, the prepayment is assumed to happen before the first payment of the loan.</div> <div id="KJE-D-SAVINGS" ><dt>Savings</dt><dd>Total amount of interest you will save by prepaying your mortgage.</div> <div id="KJE-D-BY_YEAR" ><dt>Report amortization</dt><dd>Choose how the report will display your payment schedule. Annually will summarize payments and balances by year. Monthly will show every payment for the entire term.</div> ';KJE.ReportText=" <h2 class='KJEReportHeader KJEFontHeading'>Based on the information you entered, your payment is MONTHLY_PI for TERM years with a rate of INTEREST_RATE.</h2> **GRAPH** <div class=KJECenter> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Mortgage Summary</caption> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total principal and interest payments</th><td class=KJECellStrong>TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total interest</th><td class=KJECellStrong>INTEREST_PAID</td></tr> </tfoot> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Loan amount</th><td class=KJECell>LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Term</th><td class=KJECell>TERM years</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Interest rate</th><td class=KJECell>INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly payment (PI)</th><td class=KJECell>MONTHLY_PI</td></tr> </tbody> <!--SHOW_PMI--> </table></div> </div> <h2 class='KJEReportHeader KJEFontHeading'>Prepayment Results</h2>Principal prepayments on your mortgage can save you a great deal of interest. They can also shorten the time it takes to pay off your mortgage. PREPAY_MESSAGE <div class=KJECenter> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Prepayment Summary</caption> <tfoot class='KJEReportTFooter'> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Interest savings</th><td class=KJECellStrong>PREPAY_INTEREST_SAVINGS</td></tr> <tr class=KJEFooterRow><th class=\"KJELabel KJECellBorder\" scope='row'>Mortgage paid off in</th><td class=KJECellStrong>PREPAY_PAYOFF_PERIODS</td></tr> </tfoot> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder KJECell70\" scope='row'>Amount</th><td class=KJECell>PREPAY_AMOUNT PREPAY_TYPE</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Start with payment</th><td class=KJECell>PREPAY_STARTS_WITH</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total payments</th><td class=KJECell>PREPAY_TOTAL_OF_PAYMENTS</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Total interest</th><td class=KJECell>PREPAY_INTEREST_PAID</td></tr> </tbody> </table></div> </div> <h2 class='KJEScheduleHeader KJEFontHeading'>Payment Schedule</h2> **REPEATING GROUP** ";
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on data2.profitstarscms.com denmarkstate.com ramseybank.com www.centurybanknet.com foresightbank.com fnb-hartford.com

