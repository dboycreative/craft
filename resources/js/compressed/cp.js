/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://craftcms.com/license Craft License Agreement
 @see       http://craftcms.com
 @package   craft.app.resources
*/
(function(c){Craft.CP=Garnish.Base.extend({authManager:null,$container:null,$alerts:null,$globalSidebar:null,$globalSidebarTopbar:null,$siteNameLink:null,$siteName:null,$nav:null,$subnav:null,$pageHeader:null,$containerTopbar:null,$overflowNavMenuItem:null,$overflowNavMenuBtn:null,$overflowNavMenu:null,$overflowNavMenuList:null,$overflowSubnavMenuItem:null,$overflowSubnavMenuBtn:null,$overflowSubnavMenu:null,$overflowSubnavMenuList:null,$notificationWrapper:null,$notificationContainer:null,$main:null,
$content:null,$collapsibleTables:null,$primaryForm:null,navItems:null,totalNavItems:null,visibleNavItems:null,totalNavWidth:null,showingOverflowNavMenu:!1,showingNavToggle:null,showingSidebarToggle:null,subnavItems:null,totalSubnavItems:null,visibleSubnavItems:null,totalSubnavWidth:null,showingOverflowSubnavMenu:!1,selectedItemLabel:null,fixedNotifications:!1,runningTaskInfo:null,trackTaskProgressTimeout:null,taskProgressIcon:null,$edition:null,upgradeModal:null,checkingForUpdates:!1,forcingRefreshOnUpdatesCheck:!1,
checkForUpdatesCallbacks:null,init:function(){0!=Craft.authTimeout&&(this.authManager=new Craft.AuthManager);this.$container=c("#container");this.$alerts=c("#alerts");this.$globalSidebar=c("#global-sidebar");this.$pageHeader=c("#page-header");this.$containerTopbar=c("#container .topbar");this.$globalSidebarTopbar=this.$globalSidebar.children(".topbar");this.$siteNameLink=this.$globalSidebarTopbar.children("a.site-name");this.$siteName=this.$siteNameLink.children("h2");this.$nav=c("#nav");this.$subnav=
c("#subnav");this.$sidebar=c("#sidebar");this.$notificationWrapper=c("#notifications-wrapper");this.$notificationContainer=c("#notifications");this.$main=c("#main");this.$content=c("#content");this.$collapsibleTables=c("table.collapsible");this.$edition=c("#edition");this.addListener(Garnish.$win,"touchend","updateResponsiveGlobalSidebar");this.navItems=[];this.totalNavWidth=Craft.CP.baseNavWidth;var a=this.$nav.children();this.visibleNavItems=this.totalNavItems=a.length;for(var b=0;b<this.totalNavItems;b++){var d=
c(a[b]),e=d.width();this.navItems.push(d);this.totalNavWidth+=e}this.subnavItems=[];this.totalSubnavWidth=Craft.CP.baseSubnavWidth;a=this.$subnav.children();this.visibleSubnavItems=this.totalSubnavItems=a.length;for(b=0;b<this.totalSubnavItems;b++)d=c(a[b]),e=d.width(),this.subnavItems.push(d),this.totalSubnavWidth+=e;this.addListener(this.$sidebar.find("nav ul"),"resize","updateResponsiveSidebar");this.$sidebarLinks=c("nav a",this.$sidebar);this.addListener(this.$sidebarLinks,"click","selectSidebarItem");
this.addListener(this.$container,"scroll","updateFixedNotifications");this.updateFixedNotifications();Garnish.$doc.ready(c.proxy(function(){this.addListener(Garnish.$win,"resize","onWindowResize");this.onWindowResize();var a=this.$notificationContainer.children(".error"),b=this.$notificationContainer.children(":not(.error)");a.delay(2*Craft.CP.notificationDuration).velocity("fadeOut");b.delay(Craft.CP.notificationDuration).velocity("fadeOut")},this));this.$alerts.length&&this.initAlerts();"FORM"==
this.$container.prop("nodeName")?this.$primaryForm=this.$container:this.$primaryForm=c("form[data-saveshortcut]:first");this.$primaryForm.length&&Garnish.hasAttr(this.$primaryForm,"data-saveshortcut")&&this.addListener(Garnish.$doc,"keydown",function(a){Garnish.isCtrlKeyPressed(a)&&a.keyCode==Garnish.S_KEY&&(a.preventDefault(),this.submitPrimaryForm());return!0});Garnish.$win.on("load",c.proxy(function(){this.$confirmUnloadForms=c("form[data-confirm-unload]");if(this.$confirmUnloadForms.length){Craft.forceConfirmUnload||
(this.initialFormValues=[]);for(var a=0;a<this.$confirmUnloadForms.length;a++){var b=c(this.$confirmUnloadForms);Craft.forceConfirmUnload||(this.initialFormValues[a]=b.serialize());this.addListener(b,"submit",function(){this.removeListener(Garnish.$win,"beforeunload")})}this.addListener(Garnish.$win,"beforeunload",function(a){for(var b=0;b<this.$confirmUnloadForms.length;b++)if(Craft.forceConfirmUnload||this.initialFormValues[b]!=c(this.$confirmUnloadForms[b]).serialize())return b=Craft.t("Any changes will be lost if you leave this page."),
a?a.originalEvent.returnValue=b:window.event.returnValue=b,b})}},this));this.$edition.hasClass("hot")&&this.addListener(this.$edition,"click","showUpgradeModal")},submitPrimaryForm:function(){this.trigger("beforeSaveShortcut");this.$primaryForm.data("saveshortcut-redirect")&&c('<input type="hidden" name="redirect" value="'+this.$primaryForm.data("saveshortcut-redirect")+'"/>').appendTo(this.$primaryForm);this.$primaryForm.submit()},updateSidebarMenuLabel:function(){Garnish.$win.trigger("resize");
this.selectedItemLabel=c("a.sel:first",this.$sidebar).html()},onWindowResize:function(){this.onWindowResize._cpWidth=Math.min(Garnish.$win.width(),Craft.CP.maxWidth);this.updateResponsiveGlobalSidebar();this.updateResponsiveNav();this.updateResponsiveSidebar();this.updateResponsiveTables()},updateResponsiveGlobalSidebar:function(){this.$globalSidebar.height(window.innerHeight)},updateResponsiveNav:function(){992>=this.onWindowResize._cpWidth?this.showingNavToggle||this.showNavToggle():this.showingNavToggle&&
this.hideNavToggle()},showNavToggle:function(){this.$navBtn=c('<a class="show-nav" title="'+Craft.t("Show nav")+'"></a>').prependTo(this.$containerTopbar);this.addListener(this.$navBtn,"click","toggleNav");this.showingNavToggle=!0},hideNavToggle:function(){this.$navBtn.remove();this.showingNavToggle=!1},toggleNav:function(){Garnish.$bod.hasClass("showing-nav");Garnish.$bod.toggleClass("showing-nav")},updateResponsiveSidebar:function(){0<this.$sidebar.length&&(769>this.onWindowResize._cpWidth?this.showingSidebarToggle||
this.showSidebarToggle():this.showingSidebarToggle&&this.hideSidebarToggle())},showSidebarToggle:function(){this.selectedItemLabel=c("a.sel:first",this.$sidebar).html();this.$sidebarBtn=c('<a class="show-sidebar" title="'+Craft.t("Show sidebar")+'">'+this.selectedItemLabel+"</a>").prependTo(this.$content);this.addListener(this.$sidebarBtn,"click","toggleSidebar");this.showingSidebarToggle=!0},selectSidebarItem:function(a){this.selectedItemLabel=c(a.currentTarget).html();this.$sidebarBtn&&(this.$sidebarBtn.html(this.selectedItemLabel),
this.toggleSidebar())},hideSidebarToggle:function(){this.$sidebarBtn&&this.$sidebarBtn.remove();this.showingSidebarToggle=!1},toggleSidebar:function(){this.$content.filter(".has-sidebar").toggleClass("showing-sidebar");this.updateResponsiveContent()},updateResponsiveContent:function(){var a=this.$content.filter(".has-sidebar");if(a.hasClass("showing-sidebar")){var b=c("nav",this.$sidebar).height();a.height()<=b&&a.css("height",b+48+"px")}else a.css("min-height",0),a.css("height","auto")},updateResponsiveTables:function(){for(this.updateResponsiveTables._i=
0;this.updateResponsiveTables._i<this.$collapsibleTables.length;this.updateResponsiveTables._i++)this.updateResponsiveTables._$table=this.$collapsibleTables.eq(this.updateResponsiveTables._i),this.updateResponsiveTables._containerWidth=this.updateResponsiveTables._$table.parent().width(),this.updateResponsiveTables._check=!1,0<this.updateResponsiveTables._containerWidth&&("undefined"===typeof this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._check=!0:(this.updateResponsiveTables._isCollapsed=
this.updateResponsiveTables._$table.hasClass("collapsed"),this.updateResponsiveTables._containerWidth>this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._isCollapsed&&(this.updateResponsiveTables._$table.removeClass("collapsed"),this.updateResponsiveTables._check=!0):this.updateResponsiveTables._isCollapsed||(this.updateResponsiveTables._check=!0)),this.updateResponsiveTables._check&&this.updateResponsiveTables._$table.width()>this.updateResponsiveTables._containerWidth&&
this.updateResponsiveTables._$table.addClass("collapsed"),this.updateResponsiveTables._$table.data("lastContainerWidth",this.updateResponsiveTables._containerWidth))},addLastVisibleNavItemToOverflowMenu:function(){this.navItems[this.visibleNavItems-1].prependTo(this.$overflowNavMenuList);this.visibleNavItems--},addFirstOverflowNavItemToMainMenu:function(){this.navItems[this.visibleNavItems].insertBefore(this.$overflowNavMenuItem);this.visibleNavItems++},addLastVisibleSubnavItemToOverflowMenu:function(){this.subnavItems[this.visibleSubnavItems-
1].prependTo(this.$overflowSubnavMenuList);this.visibleSubnavItems--},addFirstOverflowSubnavItemToMainMenu:function(){this.subnavItems[this.visibleSubnavItems].insertBefore(this.$overflowSubnavMenuItem);this.visibleSubnavItems++},updateFixedNotifications:function(){this.updateFixedNotifications._headerHeight=this.$globalSidebar.height();this.$container.scrollTop()>this.updateFixedNotifications._headerHeight?this.fixedNotifications||(this.$notificationWrapper.addClass("fixed"),this.fixedNotifications=
!0):this.fixedNotifications&&(this.$notificationWrapper.removeClass("fixed"),this.fixedNotifications=!1)},displayNotification:function(a,b){var d=Craft.CP.notificationDuration;"error"==a&&(d*=2);var e=c('<div class="notification '+a+'">'+b+"</div>").appendTo(this.$notificationContainer),f=-(e.outerWidth()/2)+"px";e.hide().css({opacity:0,"margin-left":f,"margin-right":f}).velocity({opacity:1,"margin-left":"2px","margin-right":"2px"},{display:"inline-block",duration:"fast"}).delay(d).velocity({opacity:0,
"margin-left":f,"margin-right":f},{complete:function(){e.remove()}});this.trigger("displayNotification",{notificationType:a,message:b})},displayNotice:function(a){this.displayNotification("notice",a)},displayError:function(a){a||(a=Craft.t("An unknown error occurred."));this.displayNotification("error",a)},fetchAlerts:function(){Craft.queueActionRequest("app/getCpAlerts",{path:Craft.path},c.proxy(this,"displayAlerts"))},displayAlerts:function(a){if(Garnish.isArray(a)&&a.length){this.$alerts=c('<ul id="alerts"/>').insertBefore(this.$containerTopbar);
for(var b=0;b<a.length;b++)c("<li>"+a[b]+"</li>").appendTo(this.$alerts);a=this.$alerts.outerHeight();this.$alerts.css("margin-top",-a).velocity({"margin-top":0},"fast");this.initAlerts()}},initAlerts:function(){var a=this.$alerts.find(".domain-mismatch:first");a.length&&this.addListener(a,"click",c.proxy(function(b){b.preventDefault();confirm(Craft.t("Are you sure you want to transfer your license to this domain?"))&&Craft.queueActionRequest("app/transferLicenseToCurrentDomain",c.proxy(function(b,
c){"success"==c&&(b.success?(a.parent().remove(),this.displayNotice(Craft.t("License transferred."))):this.displayError(b.error))},this))},this));for(var b=this.$alerts.find('a[class^="shun:"]'),d=0;d<b.length;d++)this.addListener(b[d],"click",c.proxy(function(a){a.preventDefault();var b=c(a.currentTarget);a={message:b.prop("className").substr(5)};Craft.queueActionRequest("app/shunCpAlert",a,c.proxy(function(a,c){"success"==c&&(a.success?b.parent().remove():this.displayError(a.error))},this))},this));
b=this.$alerts.find(".edition-resolution:first");b.length&&this.addListener(b,"click","showUpgradeModal")},checkForUpdates:function(a,b){if(this.checkingForUpdates&&!0===a&&!this.forcingRefreshOnUpdatesCheck){var d=b;b=function(){Craft.cp.checkForUpdates(!0,d)}}"function"==typeof b&&(Garnish.isArray(this.checkForUpdatesCallbacks)||(this.checkForUpdatesCallbacks=[]),this.checkForUpdatesCallbacks.push(b));this.checkingForUpdates||(this.checkingForUpdates=!0,this.forcingRefreshOnUpdatesCheck=!0===a,
Craft.queueActionRequest("app/checkForUpdates",{forceRefresh:!0===a},c.proxy(function(a){this.displayUpdateInfo(a);this.checkingForUpdates=!1;if(Garnish.isArray(this.checkForUpdatesCallbacks)){var b=this.checkForUpdatesCallbacks;this.checkForUpdatesCallbacks=null;for(var c=0;c<b.length;c++)b[c](a)}this.trigger("checkForUpdates",{updateInfo:a})},this)))},displayUpdateInfo:function(a){this.$globalSidebarTopbar.children("a.updates").remove();if(a.total){var b=1==a.total?Craft.t("1 update available"):
Craft.t("{num} updates available",{num:a.total});c('<a class="updates'+(a.critical?" critical":"")+'" href="'+Craft.getUrl("updates")+'" title="'+b+'"><span data-icon="newstamp"><span>'+a.total+"</span></span></span>").insertAfter(this.$siteNameLink);c("#footer-updates").text(b)}},runPendingTasks:function(){Craft.runTasksAutomatically?Craft.queueActionRequest("tasks/runPendingTasks",c.proxy(function(a,b){"success"==b&&this.trackTaskProgress(0)},this)):this.trackTaskProgress(0)},trackTaskProgress:function(a){this.trackTaskProgressTimeout||
(this.trackTaskProgressTimeout=setTimeout(c.proxy(function(){Craft.queueActionRequest("tasks/getRunningTaskInfo",c.proxy(function(a,c){"success"==c&&(this.trackTaskProgressTimeout=null,this.setRunningTaskInfo(a,!0),"running"==a.status?this.trackTaskProgress():"pending"==a.status&&this.trackTaskProgress(3E4))},this))},this),"undefined"!=typeof a?a:Craft.CP.taskTrackerUpdateInterval))},stopTrackingTaskProgress:function(){this.trackTaskProgressTimeout&&(clearTimeout(this.trackTaskProgressTimeout),this.trackTaskProgressTimeout=
null)},setRunningTaskInfo:function(a,b){(this.runningTaskInfo=a)?(this.taskProgressIcon||(this.taskProgressIcon=new k),"running"==a.status||"pending"==a.status?(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.setDescription(a.description),this.taskProgressIcon.setProgress(a.progress,b)):"error"==a.status&&this.taskProgressIcon.showFailMode()):this.taskProgressIcon&&(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.complete(),delete this.taskProgressIcon)},showUpgradeModal:function(){this.upgradeModal?
this.upgradeModal.show():this.upgradeModal=new Craft.UpgradeModal}},{maxWidth:1051,navHeight:38,baseNavWidth:30,subnavHeight:38,baseSubnavWidth:30,notificationDuration:2E3,taskTrackerUpdateInterval:1E3,taskTrackerHudUpdateInterval:500});Craft.cp=new Craft.CP;var k=Garnish.Base.extend({$li:null,$a:null,$label:null,hud:null,completed:!1,failMode:!1,_canvasSupported:null,_$bgCanvas:null,_$staticCanvas:null,_$hoverCanvas:null,_$failCanvas:null,_staticCtx:null,_hoverCtx:null,_canvasSize:null,_arcPos:null,
_arcRadius:null,_lineWidth:null,_arcStartPos:0,_arcEndPos:0,_arcStartStepSize:null,_arcEndStepSize:null,_arcStep:null,_arcStepTimeout:null,_arcAnimateCallback:null,_progressBar:null,init:function(){this.$li=c("<li/>").appendTo(Craft.cp.$nav);this.$a=c('<a id="taskicon"/>').appendTo(this.$li);this.$canvasContainer=c('<span class="icon"/>').appendTo(this.$a);this.$label=c('<span class="label"></span>').appendTo(this.$a);if(this._canvasSupported=!!document.createElement("canvas").getContext){var a=1<
window.devicePixelRatio?2:1;this._canvasSize=18*a;this._arcPos=this._canvasSize/2;this._arcRadius=7*a;this._lineWidth=3*a;this._$bgCanvas=this._createCanvas("bg","#61666b");this._$staticCanvas=this._createCanvas("static","#d7d9db");this._$hoverCanvas=this._createCanvas("hover","#fff");this._$failCanvas=this._createCanvas("fail","#da5a47").hide();this._staticCtx=this._$staticCanvas[0].getContext("2d");this._hoverCtx=this._$hoverCanvas[0].getContext("2d");this._drawArc(this._$bgCanvas[0].getContext("2d"),
0,1);this._drawArc(this._$failCanvas[0].getContext("2d"),0,1)}else this._progressBar=new Craft.ProgressBar(this.$canvasContainer),this._progressBar.showProgressBar();this.addListener(this.$a,"click","toggleHud")},setDescription:function(a){this.$a.attr("title",a);this.$label.html(a)},setProgress:function(a,b){this._canvasSupported?b?this._animateArc(0,a):this._setArc(0,a):this._progressBar.setProgressPercentage(100*a)},complete:function(){this.completed=!0;this._canvasSupported?this._animateArc(0,
1,c.proxy(function(){this._$bgCanvas.velocity("fadeOut");this._animateArc(1,1,c.proxy(function(){this.$a.remove();this.destroy()},this))},this)):(this._progressBar.setProgressPercentage(100),this.$a.velocity("fadeOut"))},showFailMode:function(){this.failMode||(this.failMode=!0,this._canvasSupported?(this._$bgCanvas.hide(),this._$staticCanvas.hide(),this._$hoverCanvas.hide(),this._$failCanvas.show()):(this._progressBar.$progressBar.css("border-color","#da5a47"),this._progressBar.$innerProgressBar.css("background-color",
"#da5a47"),this._progressBar.setProgressPercentage(50)),this.setDescription(Craft.t("Failed task")))},hideFailMode:function(){this.failMode&&(this.failMode=!1,this._canvasSupported?(this._$bgCanvas.show(),this._$staticCanvas.show(),this._$hoverCanvas.show(),this._$failCanvas.hide()):(this._progressBar.$progressBar.css("border-color",""),this._progressBar.$innerProgressBar.css("background-color",""),this._progressBar.setProgressPercentage(50)))},toggleHud:function(){this.hud?this.hud.toggle():this.hud=
new h},_createCanvas:function(a,b){var d=c('<canvas id="taskicon-'+a+'" width="'+this._canvasSize+'" height="'+this._canvasSize+'"/>').appendTo(this.$canvasContainer),e=d[0].getContext("2d");e.strokeStyle=b;e.lineWidth=this._lineWidth;e.lineCap="round";return d},_setArc:function(a,b){this._arcStartPos=a;this._arcEndPos=b;this._drawArc(this._staticCtx,a,b);this._drawArc(this._hoverCtx,a,b)},_drawArc:function(a,b,c){a.clearRect(0,0,this._canvasSize,this._canvasSize);a.beginPath();a.arc(this._arcPos,
this._arcPos,this._arcRadius,(1.5+2*b)*Math.PI,(1.5+2*c)*Math.PI);a.stroke();a.closePath()},_animateArc:function(a,b,c){this._arcStepTimeout&&clearTimeout(this._arcStepTimeout);this._arcStep=0;this._arcStartStepSize=(a-this._arcStartPos)/10;this._arcEndStepSize=(b-this._arcEndPos)/10;this._arcAnimateCallback=c;this._takeNextArcStep()},_takeNextArcStep:function(){this._setArc(this._arcStartPos+this._arcStartStepSize,this._arcEndPos+this._arcEndStepSize);this._arcStep++;10>this._arcStep?this._arcStepTimeout=
setTimeout(c.proxy(this,"_takeNextArcStep"),50):this._arcAnimateCallback&&this._arcAnimateCallback()}}),h=Garnish.HUD.extend({icon:null,tasksById:null,completedTasks:null,updateTasksTimeout:null,completed:!1,init:function(){this.icon=Craft.cp.taskProgressIcon;this.tasksById={};this.completedTasks=[];this.base(this.icon.$a);this.$main.attr("id","tasks-hud");Craft.cp.runningTaskInfo&&"error"!=Craft.cp.runningTaskInfo.status&&this.showTaskInfo([Craft.cp.runningTaskInfo]);this.$main.trigger("resize")},
onShow:function(){Craft.cp.stopTrackingTaskProgress();this.updateTasks();this.base()},onHide:function(){this.updateTasksTimeout&&clearTimeout(this.updateTasksTimeout);this.completed||Craft.cp.trackTaskProgress();if(this.completedTasks.length){for(var a=0;a<this.completedTasks.length;a++)this.completedTasks[a].destroy();this.completedTasks=[]}this.base()},updateTasks:function(){this.completed=!1;Craft.postActionRequest("tasks/getTaskInfo",c.proxy(function(a,b){"success"==b&&this.showTaskInfo(a)},this))},
showTaskInfo:function(a){var b=[];if(a)for(var d=0;d<a.length;d++)b.push(a[d].id);for(var e in this.tasksById)Craft.inArray(e,b)||(this.tasksById[e].complete(),this.completedTasks.push(this.tasksById[e]),delete this.tasksById[e]);if(a&&a.length){e=b=!1;for(d=0;d<a.length;d++){var f=a[d];b||"running"!=f.status?e||"error"!=f.status||(e=!0):b=!0;if(this.tasksById[f.id])this.tasksById[f.id].updateStatus(f);else{this.tasksById[f.id]=new h.Task(this,f);for(var g=d+1;g<a.length;g++)if(this.tasksById[a[g].id]){this.tasksById[f.id].$container.insertBefore(this.tasksById[a[g].id].$container);
break}}}b?this.updateTasksTimeout=setTimeout(c.proxy(this,"updateTasks"),Craft.CP.taskTrackerHudUpdateInterval):(this.completed=!0,e&&Craft.cp.setRunningTaskInfo({status:"error"}))}else this.completed=!0,Craft.cp.setRunningTaskInfo(null),this.hide()}});h.Task=Garnish.Base.extend({hud:null,id:null,level:null,description:null,status:null,progress:null,$container:null,$statusContainer:null,$descriptionContainer:null,_progressBar:null,init:function(a,b){this.hud=a;this.id=b.id;this.level=b.level;this.description=
b.description;this.$container=c('<div class="task"/>').appendTo(this.hud.$main);this.$statusContainer=c('<div class="task-status"/>').appendTo(this.$container);this.$descriptionContainer=c('<div class="task-description"/>').appendTo(this.$container).text(b.description);this.$container.data("task",this);0!=this.level&&(this.$container.css("padding-"+Craft.left,24+24*this.level),c('<div class="indent" data-icon="'+("ltr"==Craft.orientation?"rarr":"larr")+'"/>').appendTo(this.$descriptionContainer));
this.updateStatus(b)},updateStatus:function(a){if(this.status!=a.status)switch(this.$statusContainer.empty(),this.status=a.status,this.status){case "pending":this.$statusContainer.text(Craft.t("Pending"));break;case "running":this._progressBar=new Craft.ProgressBar(this.$statusContainer);this._progressBar.showProgressBar();break;case "error":if(c('<span class="error">'+Craft.t("Failed")+"</span>").appendTo(this.$statusContainer),0==this.level){var b=c('<a class="menubtn error" title="'+Craft.t("Options")+
'"/>').appendTo(this.$statusContainer);c('<div class="menu"><ul><li><a data-action="rerun">'+Craft.t("Try again")+'</a></li><li><a data-action="cancel">'+Craft.t("Cancel")+"</a></li></ul></div>").appendTo(this.$statusContainer);new Garnish.MenuBtn(b,{onOptionSelect:c.proxy(this,"performErrorAction")})}}"running"==this.status&&(this._progressBar.setProgressPercentage(100*a.progress),0==this.level&&Craft.cp.setRunningTaskInfo(a,!0))},performErrorAction:function(a){for(var b=this.$container.nextAll(),
d=0;d<b.length;d++){var e=c(b[d]).data("task");if(e&&0!=e.level)e.destroy();else break}switch(c(a).data("action")){case "rerun":Craft.postActionRequest("tasks/rerunTask",{taskId:this.id},c.proxy(function(a,b){"success"==b&&(this.updateStatus(a),this.hud.completed&&this.hud.updateTasks())},this));break;case "cancel":Craft.postActionRequest("tasks/deleteTask",{taskId:this.id},c.proxy(function(a,b){"success"==b&&(this.destroy(),this.hud.completed&&this.hud.updateTasks())},this))}},complete:function(){this.$statusContainer.empty();
c('<div data-icon="check"/>').appendTo(this.$statusContainer)},destroy:function(){this.hud.tasksById[this.id]&&delete this.hud.tasksById[this.id];this.$container.remove();this.base()}})})(jQuery);

//# sourceMappingURL=cp.min.map
