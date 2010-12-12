/**
 * @file common.js
 * @author NHN (developers@xpressengine.com)
 * @brief 몇가지 유용한 & 기본적으로 자주 사용되는 자바스크립트 함수들 모음
 **/

if(jQuery)jQuery.noConflict();(function($){var UA=navigator.userAgent.toLowerCase();$.os={Linux:/linux/.test(UA),Unix:/x11/.test(UA),Mac:/mac/.test(UA),Windows:/win/.test(UA)};$.os.name=($.os.Windows)?'Windows':($.os.Linux)?'Linux':($.os.Unix)?'Unix':($.os.Mac)?'Mac':'';window.XE={loaded_popup_menus:new Array(),addedDocument:new Array(),checkboxToggleAll:function(){var itemName='cart';var options={wrap:null,checked:'toggle',doClick:false};switch(arguments.length){case 1:if(typeof(arguments[0])=="string"){itemName=arguments[0];}else{$.extend(options,arguments[0]||{});}
break;case 2:itemName=arguments[0];$.extend(options,arguments[1]||{});}
if(options.doClick==true)options.checked=null;if(typeof(options.wrap)=="string")options.wrap='#'+options.wrap;if(options.wrap){var obj=$(options.wrap).find('input[name='+itemName+']:checkbox');}else{var obj=$('input[name='+itemName+']:checkbox');}
if(options.checked=='toggle'){obj.each(function(){$(this).attr('checked',($(this).attr('checked'))?false:true);});}else{(options.doClick==true)?obj.click():obj.attr('checked',options.checked);}},displayPopupMenu:function(ret_obj,response_tags,params){var target_srl=params["target_srl"];var menu_id=params["menu_id"];var menus=ret_obj['menus'];var html="";if(this.loaded_popup_menus[menu_id]){html=this.loaded_popup_menus[menu_id];}else{if(menus){var item=menus['item'];if(typeof(item.length)=='undefined'||item.length<1)item=new Array(item);if(item.length){for(var i=0;i<item.length;i++){var url=item[i].url;var str=item[i].str;var icon=item[i].icon;var target=item[i].target;var styleText="";var click_str="";if(icon)styleText=" style=\"background-image:url('"+icon+"')\" ";switch(target){case"popup":click_str=" onclick=\"popopen(this.href,'"+target+"'); return false;\"";break;case"self":break;case"javascript":click_str=" onclick=\""+url+"; return false; \"";url="#";break;default:click_str=" onclick=\"window.open(this.href); return false;\"";break;}
html+='<li '+styleText+'><a href="'+url+'"'+click_str+'>'+str+'</a></li> ';}}}
this.loaded_popup_menus[menu_id]=html;}
if(html){var area=$('#popup_menu_area').html('<ul>'+html+'</ul>');var areaOffset={top:params['page_y'],left:params['page_x']};if(area.outerHeight()+areaOffset.top>$(window).height()+$(window).scrollTop())
areaOffset.top=$(window).height()-area.outerHeight()+$(window).scrollTop();if(area.outerWidth()+areaOffset.left>$(window).width()+$(window).scrollLeft())
areaOffset.left=$(window).width()-area.outerWidth()+$(window).scrollLeft();area.css({top:areaOffset.top,left:areaOffset.left}).show();}}}})(jQuery);jQuery(function($){if(!$('#popup_menu_area').length){var menuObj=$('<div>').attr('id','popup_menu_area').css({display:'none',zIndex:9999});$(document.body).append(menuObj);}
$(document).click(function(evt){var area=$('#popup_menu_area');if(!area.length)return;area.hide();var targetObj=$(evt.target);if(!targetObj.length)return;if(targetObj.length&&$.inArray(targetObj.attr('nodeName'),['DIV','SPAN','A'])==-1)targetObj=targetObj.parent();if(!targetObj.length||$.inArray(targetObj.attr('nodeName'),['DIV','SPAN','A'])==-1)return;var class_name=targetObj.attr('className');if(class_name.indexOf('_')<=0)return;var class_name_list=class_name.split(' ');var menu_id='';var menu_id_regx=/^([a-zA-Z]+)_([0-9]+)$/;for(var i=0,c=class_name_list.length;i<c;i++){if(menu_id_regx.test(class_name_list[i])){menu_id=class_name_list[i];}}
if(!menu_id)return;var tmp_arr=menu_id.split('_');var module_name=tmp_arr[0];var target_srl=tmp_arr[1];if(!module_name||!target_srl||target_srl<1)return;var action_name="get"+module_name.substr(0,1).toUpperCase()+module_name.substr(1,module_name.length-1)+"Menu";var params=new Array();params["target_srl"]=target_srl;params["mid"]=params["cur_mid"]=current_mid;params["cur_act"]=current_url.getQuery('act');params["menu_id"]=menu_id;params["page_x"]=evt.pageX;params["page_y"]=evt.pageY;if(typeof(xeVid)!='undefined')params["vid"]=xeVid;var response_tags=new Array("error","message","menus");if(typeof(XE.loaded_popup_menus[menu_id])!='undefined'){XE.displayPopupMenu(params,response_tags,params);return;}
show_waiting_message=false;exec_xml(module_name,action_name,params,XE.displayPopupMenu,response_tags,params);show_waiting_message=true;});if($.browser.msie){$('select').each(function(i,sels){var disabled_exists=false;var first_enable=new Array();for(var j=0;j<sels.options.length;j++){if(sels.options[j].disabled){sels.options[j].style.color='#CCCCCC';disabled_exists=true;}else{first_enable[i]=(first_enable[i]>-1)?first_enable[i]:j;}}
if(!disabled_exists)return;sels.oldonchange=sels.onchange;sels.onchange=function(){if(this.options[this.selectedIndex].disabled){this.selectedIndex=first_enable[i];}else{if(this.oldonchange)this.oldonchange();}};if(sels.selectedIndex>=0&&sels.options[sels.selectedIndex].disabled)sels.onchange();});}
var drEditorFold=$('.xe_content .fold_button');if(drEditorFold.size()){var fold_container=$('div.fold_container',drEditorFold);$('button.more',drEditorFold).click(function(){$(this).hide().next('button').show().parent().next(fold_container).show();});$('button.less',drEditorFold).click(function(){$(this).hide().prev('button').show().parent().next(fold_container).hide();});}});String.prototype.getQuery=function(key){var idx=this.indexOf('?');if(idx==-1)return null;var query_string=this.substr(idx+1,this.length);var args={};query_string.replace(/([^=]+)=([^&]*)(&|$)/g,function(){args[arguments[1]]=arguments[2];});var q=args[key];if(typeof(q)=="undefined")q="";return q;}
String.prototype.setQuery=function(key,val){var idx=this.indexOf('?');var uri=this;uri=uri.replace(/#$/,'');if(idx!=-1){uri=this.substr(0,idx);var query_string=this.substr(idx+1,this.length);var args=new Array();query_string.replace(/([^=]+)=([^&]*)(&|$)/g,function(){args[arguments[1]]=arguments[2];});args[key]=val;var q_list=new Array();for(var i in args){if(!args.hasOwnProperty(i))continue;var arg=args[i];if(!arg.toString().trim())continue;arg=decodeURI(arg);q_list[q_list.length]=i+'='+arg;}
uri=uri+"?"+q_list.join("&");}else{if(val.toString().trim())uri=uri+"?"+key+"="+val;}
var re=/https:\/\/([^:\/]+)(:\d+|)/i;var check=re.exec(uri);if(check)
{var toReplace="http://"+check[1];if(typeof(http_port)!='undefined'&&http_port!=80)
{toReplace+=":"+http_port;}
uri=uri.replace(re,toReplace);}
var bUseSSL=false;if(typeof(enforce_ssl)!='undefined'&&enforce_ssl)
{bUseSSL=true;}
else if(typeof(ssl_actions)!='undefined'&&typeof(ssl_actions.length)!='undefined'&&uri.getQuery('act')){var act=uri.getQuery('act');for(i=0;i<ssl_actions.length;i++){if(ssl_actions[i]==act){bUseSSL=true;break;}}}
if(bUseSSL)
{var re=/http:\/\/([^:\/]+)(:\d+|)/i;var check=re.exec(uri);if(check)
{var toReplace="https://"+check[1];if(typeof(https_port)!='undefined'&&https_port!=443)
{toReplace+=":"+https_port;}
uri=uri.replace(re,toReplace);}}
return encodeURI(uri);}
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}
function xSleep(sec){sec=sec/1000;var now=new Date();var sleep=new Date();while(sleep.getTime()-now.getTime()<sec){sleep=new Date();}}
function isDef(){for(var i=0;i<arguments.length;++i){if(typeof(arguments[i])=="undefined")return false;}
return true;}
var winopen_list=new Array();function winopen(url,target,attribute){if(typeof(xeVid)!='undefined'&&url.indexOf(request_uri)>-1&&!url.getQuery('vid'))url=url.setQuery('vid',xeVid);try{if(target!="_blank"&&winopen_list[target]){winopen_list[target].close();winopen_list[target]=null;}}catch(e){}
if(typeof(target)=='undefined')target='_blank';if(typeof(attribute)=='undefined')attribute='';var win=window.open(url,target,attribute);win.focus();if(target!="_blank")winopen_list[target]=win;}
function popopen(url,target){if(typeof(target)=="undefined")target="_blank";if(typeof(xeVid)!='undefined'&&url.indexOf(request_uri)>-1&&!url.getQuery('vid'))url=url.setQuery('vid',xeVid);winopen(url,target,"left=10,top=10,width=10,height=10,scrollbars=no,resizable=yes,toolbars=no");}
function sendMailTo(to){location.href="mailto:"+to;}
function move_url(url,open_wnidow){if(!url)return false;if(typeof(open_wnidow)=='undefined')open_wnidow='N';if(open_wnidow=='N'){open_wnidow=false;}else{open_wnidow=true;}
if(/^\./.test(url))url=request_uri+url;if(open_wnidow){winopen(url);}else{location.href=url;}
return false;}
function displayMultimedia(src,width,height,options){var html=_displayMultimedia(src,width,height,options);if(html)document.writeln(html);}
function _displayMultimedia(src,width,height,options){if(src.indexOf('files')==0)src=request_uri+src;var defaults={wmode:'transparent',allowScriptAccess:'sameDomain',quality:'high',flashvars:'',autostart:false};var params=jQuery.extend(defaults,options||{});var autostart=(params.autostart&&params.autostart!='false')?'true':'false';delete(params.autostart);var clsid="";var codebase="";var html="";if(/\.(gif|jpg|jpeg|bmp|png)$/i.test(src)){html='<img src="'+src+'" width="'+width+'" height="'+height+'" />';}else if(/\.flv$/i.test(src)||/\.mov$/i.test(src)||/\.moov$/i.test(src)||/\.m4v$/i.test(src)){html='<embed src="'+request_uri+'common/tpl/images/flvplayer.swf" allowfullscreen="true" autostart="'+autostart+'" width="'+width+'" height="'+height+'" flashvars="&file='+src+'&width='+width+'&height='+height+'&autostart='+autostart+'" wmode="'+params.wmode+'" />';}else if(/\.swf/i.test(src)){clsid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';if(typeof(enforce_ssl)!='undefined'&&enforce_ssl){codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0";}
else{codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0";}
html='<object classid="'+clsid+'" codebase="'+codebase+'" width="'+width+'" height="'+height+'" flashvars="'+params.flashvars+'">';html+='<param name="movie" value="'+src+'" />';for(var name in params){if(params[name]!='undefined'&&params[name]!=''){html+='<param name="'+name+'" value="'+params[name]+'" />';}}
html+=''
+'<embed src="'+src+'" autostart="'+autostart+'"  width="'+width+'" height="'+height+'" flashvars="'+params.flashvars+'" wmode="'+params.wmode+'"></embed>'
+'</object>';}else{if(jQuery.browser.mozilla||jQuery.browser.opera){autostart=(params.autostart&&params.autostart!='false')?'1':'0';}
html='<embed src="'+src+'" autostart="'+autostart+'" width="'+width+'" height="'+height+'"';if(params.wmode=='transparent'){html+=' windowlessvideo="1"';}
html+='></embed>';}
return html;}
function zbxe_folder_open(id){jQuery("#folder_open_"+id).hide();jQuery("#folder_close_"+id).show();jQuery("#folder_"+id).show();}
function zbxe_folder_close(id){jQuery("#folder_open_"+id).show();jQuery("#folder_close_"+id).hide();jQuery("#folder_"+id).hide();}
function setFixedPopupSize(){var $=jQuery;var $header=$('#popHeader');var $body=$('#popBody');if($body.length){if($body.height()>400){$body.css({overflow:'auto',overflowX:'hidden',height:400+'px'});}}
var $win=$(window);var $pc=$('#popup_content');var w=Math.max($pc[0].offsetWidth,600);var h=$pc[0].offsetHeight;var dw=$win.width();var dh=$win.height();var _w=0,_h=0;if(w!=dw)_w=w-dw;if(h!=dh)_h=h-dh;if(_w||_h){window.resizeBy(_w,_h);}
if(!arguments.callee.executed){setTimeout(setFixedPopupSize,300);arguments.callee.executed=true;}}
function doCallModuleAction(module,action,target_srl){var params=new Array();params['target_srl']=target_srl;params['cur_mid']=current_mid;exec_xml(module,action,params,completeCallModuleAction);}
function completeCallModuleAction(ret_obj,response_tags){if(ret_obj['message']!='success')alert(ret_obj['message']);location.reload();}
function completeMessage(ret_obj){alert(ret_obj['message']);location.reload();}
function doChangeLangType(obj){if(typeof(obj)=="string"){setLangType(obj);}else{var val=obj.options[obj.selectedIndex].value;setLangType(val);}
location.reload();}
function setLangType(lang_type){var expire=new Date();expire.setTime(expire.getTime()+(7000*24*3600000));xSetCookie('lang_type',lang_type,expire,'/');}
function doDocumentPreview(obj){var fo_obj=obj;while(fo_obj.nodeName!="FORM"){fo_obj=fo_obj.parentNode;}
if(fo_obj.nodeName!="FORM")return;var editor_sequence=fo_obj.getAttribute('editor_sequence');var content=editorGetContent(editor_sequence);var win=window.open("","previewDocument","toolbars=no,width=700px;height=800px,scrollbars=yes,resizable=yes");var dummy_obj=jQuery("#previewDocument");if(!dummy_obj.length){jQuery('<form id="previewDocument" target="previewDocument" method="post" action="'+request_uri+'">'+'<input type="hidden" name="module" value="document" />'+'<input type="hidden" name="act" value="dispDocumentPreview" />'+'<input type="hidden" name="content" />'+'</form>').appendTo(document.body);dummy_obj=jQuery("#previewDocument")[0];}
if(dummy_obj){dummy_obj.content.value=content;dummy_obj.submit();}}
function doDocumentSave(obj){var editor_sequence=obj.form.getAttribute('editor_sequence');var prev_content=editorRelKeys[editor_sequence]['content'].value;if(typeof(editor_sequence)!='undefined'&&editor_sequence&&typeof(editorRelKeys)!='undefined'&&typeof(editorGetContent)=='function'){var content=editorGetContent(editor_sequence);editorRelKeys[editor_sequence]['content'].value=content;}
var params={},responses=['error','message','document_srl'],elms=obj.form.elements,data=jQuery(obj.form).serializeArray();;jQuery.each(data,function(i,field){var val=jQuery.trim(field.value);if(!val)return true;if(/\[\]$/.test(field.name))field.name=field.name.replace(/\[\]$/,'');if(params[field.name])params[field.name]+='|@|'+val;else params[field.name]=field.value;});exec_xml('member','procMemberSaveDocument',params,completeDocumentSave,responses,params,obj.form);editorRelKeys[editor_sequence]['content'].value=prev_content;return false;}
function completeDocumentSave(ret_obj){jQuery('input[name=document_srl]').eq(0).val(ret_obj['document_srl']);alert(ret_obj['message']);}
var objForSavedDoc=null;function doDocumentLoad(obj){objForSavedDoc=obj.form;popopen(request_uri.setQuery('module','member').setQuery('act','dispSavedDocumentList'));}
function doDocumentSelect(document_srl){if(!opener||!opener.objForSavedDoc){window.close();return;}
opener.location.href=opener.current_url.setQuery('document_srl',document_srl).setQuery('act','dispBoardWrite');window.close();}
function viewSkinInfo(module,skin){popopen("./?module=module&act=dispModuleSkinInfo&selected_module="+module+"&skin="+skin,'SkinInfo');}
var addedDocument=new Array();function doAddDocumentCart(obj){var srl=obj.value;addedDocument[addedDocument.length]=srl;setTimeout(function(){callAddDocumentCart(addedDocument.length);},100);}
function callAddDocumentCart(document_length){if(addedDocument.length<1||document_length!=addedDocument.length)return;var params=new Array();params["srls"]=addedDocument.join(",");exec_xml("document","procDocumentAddCart",params,null);addedDocument=new Array();}
function transRGB2Hex(value){if(!value)return value;if(value.indexOf('#')>-1)return value.replace(/^#/,'');if(value.toLowerCase().indexOf('rgb')<0)return value;value=value.replace(/^rgb\(/i,'').replace(/\)$/,'');value_list=value.split(',');var hex='';for(var i=0;i<value_list.length;i++){var color=parseInt(value_list[i],10).toString(16);if(color.length==1)color='0'+color;hex+=color;}
return hex;}
function toggleSecuritySignIn(){var href=location.href;if(/https:\/\//i.test(href))location.href=href.replace(/^https/i,'http');else location.href=href.replace(/^http/i,'https');}
function reloadDocument(){location.reload();}
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+
this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+
this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}
if(typeof(resizeImageContents)=='undefined'){function resizeImageContents(){}}
if(typeof(activateOptionDisabled)=='undefined'){function activateOptionDisabled(){}}
objectExtend=jQuery.extend;function toggleDisplay(objId){jQuery('#'+objId).toggle();}
function checkboxSelectAll(formObj,name,checked){var itemName=name;var option={};if(typeof(formObj)!="undefined")option.wrap=formObj;if(typeof(checked)!="undefined")option.checked=checked;XE.checkboxToggleAll(itemName,option);}
function clickCheckBoxAll(formObj,name){var itemName=name;var option={doClick:true};if(typeof(formObj)!="undefined")option.wrap=formObj;XE.checkboxToggleAll(itemName,option);}
function svc_folder_open(id){jQuery("#_folder_open_"+id).hide();jQuery("#_folder_close_"+id).show();jQuery("#_folder_"+id).show();}
function svc_folder_close(id){jQuery("#_folder_open_"+id).show();jQuery("#_folder_close_"+id).hide();jQuery("#_folder_"+id).hide();}
function open_calendar(fo_id,day_str,callback_func){if(typeof(day_str)=="undefined")day_str="";var url="./common/tpl/calendar.php?";if(fo_id)url+="fo_id="+fo_id;if(day_str)url+="&day_str="+day_str;if(callback_func)url+="&callback_func="+callback_func;popopen(url,'Calendar');}
var loaded_popup_menus=XE.loaded_popup_menus;function createPopupMenu(){}
function chkPopupMenu(){}
function displayPopupMenu(ret_obj,response_tags,params){XE.displayPopupMenu(ret_obj,response_tags,params);}
function GetObjLeft(obj){return jQuery(obj).offset().left;}
function GetObjTop(obj){return jQuery(obj).offset().top;}
function replaceOuterHTML(obj,html){jQuery(obj).replaceWith(html);}
function getOuterHTML(obj){return jQuery(obj).html().trim();}
jQuery(function(){jQuery(".lang_code").each(function()
{var objText=jQuery(this);var targetName=objText.attr("id");if(typeof(targetName)=="undefined")targetName=objText.attr("name");if(typeof(targetName)=="undefined")return;objText.after("<a href='"+request_uri.setQuery('module','module').setQuery('act','dispModuleAdminLangcode').setQuery('target',targetName)+"' class='buttonSet buttonSetting' onclick='popopen(this.href);return false;'><span>find_langcode</span></a>");});});