

// Calculator backgrounds and colors
KJE.ErrorBackground="#FF7777"; // backgroundColor
KJE.IncompleteBackground="#FFFF77";
KJE.ClearColor="#FFFFFF";
KJE.colorList=["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];

// Report Header and Footer
KJE.ReportHeader="<div class='KJEReportTitleBlock'><div class='KJEReportTitle'>**REPORT_TITLE**</div>data2.profitstarscms.com</div>";
KJE.ReportFooter="<div class=KJECenter><p class='KJEReportFooter KJECenter'>Information and interactive calculators are made available to you as self-help tools for your independent use and are not intended to provide investment advice. We cannot and do not guarantee their applicability or accuracy in regards to your individual circumstances. All examples are hypothetical and are for illustrative purposes.  We encourage you to seek personalized advice from qualified professionals regarding all personal finance issues.</p></div><!--EXTRA_FOOTER-->";

KJE.parseDefinitions = function(sDefn) {
  return KJE.replace("<a href='http", "<a onclick='return KJE.clickAlert();' href='http",sDefn);
};

KJE.clickAlert=function() {
  return confirm("This Financial Institution has no control over information at any site hyperlinked to or from this Site. The Financial Institution makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by this Financial Institution of any information in any hyperlinked site. In no event shall this Financial Institution be responsible for your use of a hyperlinked site.");
};


// Graph fonts, colors and heights
KJE.gFont           = ["Karla","Playfair Display","Helvetica"];
KJE.gFontStyle      = ["normal","bold",""];
KJE.gFontSize       = [16,14,14];
KJE.gHeight               = 250;
KJE.gHeightReport         = 350;
KJE.gColorBackground      ="#FFFFFF";
KJE.gColorForeground      ="#333333";
KJE.gColorGrid            ="#BBBBBB";
KJE.gColorGridBackground1 ="#FFFFFF";
KJE.gColorGridBackground2 ="#FFFFFF";
KJE.gColorAxisLine        ="#909590";
KJE.gColorText            ="#474947";
KJE.gColorList            = ["#08415c","#063145","#3b677c","#0196b3","#017186","#FFDD4A","#fee376","#bfa638","#e2e2e2","#909590","#666666","#474947","#3b677c","#08415c","#098191","#2799a8","#0b516d","#f7db66","#c9ab2d","#18bbd1","#398e99"];
