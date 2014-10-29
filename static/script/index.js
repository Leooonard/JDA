$(document).ready(function(){

    //ueditor配置.
    var ue= new baidu.editor.ui.Editor({
         toolbars: [[
               'undo', 'redo', '|', 'bold', 'formatmatch', '|', 'selectall',  '|',
              'fontfamily', 'fontsize', '|', 'cleardoc',  'forecolor',   
              'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link' 
              , 'emotion', '|', 'date', 'time', '|', 'searchplace', 'li neheight'
        ]],
        maximumWords: 400
    });
    // ue.ui.imageActionName= 'uploadfile&target=blog';
    ue.render("ncontent");

    var showLoading= function(showWord, showScreen){
         var $loadingScreen= $(".loadingScreen");
         var $loadingWord= $(".loadingWord");
         if(showScreen!== false){
              $loadingScreen.css("display", "block");
         }
         if(showWord!== false){
              $loadingWord.css("display", "block");  
         }
    };
    var hideLoading= function(){  
         var $loadingScreen= $(".loadingScreen");
         var $loadingWord= $(".loadingWord");
         $loadingScreen.css("display", "none");
         $loadingWord.css("display", "none");
    };

    //第一级子菜单li.
    var $sideNavLi= $("#sideNav li");
    $sideNavLi.click(function(){
         $sideNavLi.each(function(){
              if($(this).hasClass("active")){
                   $(this).removeClass("active");
                   $(this).find(".collapse").collapse("hide");
              }
         });
         $(this).addClass("active");
    });

    //心跳连接
    var lrid= undefined;
    var lcid= undefined;
    var latestRepairList= [];
    var latestComplaintList= [];
    var $badge= $(".badge");
    $.get("/ajaxgetlatest/", function(data){
        if(data== 'failed'){
            alert('getlatest failed');
        }else{
            var obj= JSON.parse(data);
            lrid= obj.lrid;
            lcid= obj.lcid;
            setTimeout(function(){
                //lrid是最新的保修单ID, lcid是最新的投诉ID.
                var func= arguments.callee;
                $.get("/ajaxheartbeatquery/?lrid="+ lrid.toString()+ "&lcid="+ lcid.toString(), function(data){
                    if(data== 'failed'){
                        alert('failed');
                    }else if(data.length== 0){

                    }else{
                        var obj= JSON.parse(data);
                        lrid= obj.lrid;
                        lcid= obj.lcid;
                        latestRepairList= latestRepairList.concat(obj.repairList);
                        latestComplaintList= latestComplaintList.concat(obj.complaintList);
                        if(obj.repairList.length+ obj.complaintList.length> 0){
                            $badge.text(parseInt($badge.text())+ obj.repairList.length+ obj.complaintList.length);
                        }
                    }
                    setTimeout(func, 2000);
                });
            }, 2000);
        }
        return false;
    });
    $badge.parent().click(function(){
        var $floatInfo= CreateFloatDetailedInfo("最新报修&投诉", null);
        var obj= {
            "latestRepairList": latestRepairList,
            "latestComplaintList": latestComplaintList
        }
        JSONStr= JSON.stringify(obj);
        $.get("/ajaxgetlatestinfo/?latestList="+ JSONStr, function(data){
            if(data== 'failed'){
                alert("failed");
            }else{
                var $table= $(data);
                AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
                $badge.text(0);
                latestRepairList= [];
                latestComplaintList= [];
                $table.find("a").click(function(){
                    var $this= $(this);
                    var $id= $($this.closest("tr").children("td").get(0)); //cid的td节点.
                    // var $urole= $($this.closest("tr").children("td").get(2));
                    var $type= $($this.closest("tr").children("td").get(3));
                    if($type.text()== "报修"){
                        var $floatInfo= CreateFloatDetailedInfo("报修详细信息", null, "指派处理人员", function(){ //浮动的显示具体信息的div.
                            SelectHandler();
                        });
                        $.get("/ajaxrepairrow/?cid="+ $id.text(), function(data){
                            var $table= $(data);
                            AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
                        });
                    }else if($type.text()== "投诉"){   
                        var $floatInfo= CreateFloatDetailedInfo("投诉详细信息", null, "指派处理人员", function(){ //浮动的显示具体信息的div.
                            SelectHandler();
                        });
                        $.get("/ajaxcomplaintrow/?cid="+ $id.text(), function(data){
                            var $table= $(data);
                            AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
                        });
                    }
                    return false;
                });
            }
        });
        return false;
    });

//------------------------------------首页页面功能-----------------------------------------------

    var clock= $("div.clock").FlipClock({});
    var date= new Date();
    clock.setTime(date.getHours()* 3600+ date.getMinutes()* 60+ date.getSeconds());

    var $unrepairTable= $("div.unrepairTable");
     $.get("/ajaxunrepairtable/", function(data){
          $unrepairTable.append($(data));
          $unrepairTable.css("background", "none");
          $unrepairTable.css("background-color", "white");
          $unrepairTable.delegate("a.unrepairTitle", "click", function(){
                var $this= $(this);
                var $rid= $($this.closest("tr").children("td").get(0)); //rid的td节点.
                // var $urole= $($this.closest("tr").children("td").get(2));
                var $floatInfo= CreateFloatDetailedInfo("报修详细信息", null, "指派维修人员", function(){ //浮动的显示具体信息的div.
                    SelectHandler();
                });
                $.get("/ajaxrepairrow/?rid="+ $rid.text(), function(data){
                    var $table= $(data);
                    AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
                });
                return false;
          });
     });
    var $unsolvecomplaintTable= $("div.unsolvecomplaintTable");
     $.get("/ajaxunsolvecomplainttable/", function(data){
          $unsolvecomplaintTable.append($(data));
          $unsolvecomplaintTable.css("background", "none");
          $unsolvecomplaintTable.css("background-color", "white");
          $unsolvecomplaintTable.delegate("a.unsolveComplaintTitle", "click", function(){
                var $this= $(this);
                var $cid= $($this.closest("tr").children("td").get(0)); //cid的td节点.
                // var $urole= $($this.closest("tr").children("td").get(2));
                var $floatInfo= CreateFloatDetailedInfo("投诉详细信息", null, "指派处理人员", function(){ //浮动的显示具体信息的div.
                    SelectHandler();
                });
                $.get("/ajaxcomplaintrow/?cid="+ $cid.text(), function(data){
                    var $table= $(data);
                    AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
                });
                return false;
          });
     });

     var $indexBtn= $("#indexBtn");
     var $welcomeTable= $("div.welcomeTable");
     $indexBtn.click(function(){
        $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
         $welcomeTable.css("display", "block");
         $unrepairTable.empty();
         $unrepairTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
         $unsolvecomplaintTable.empty();
         $unsolvecomplaintTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
         $.get("/ajaxunrepairtable/", function(data){
              $unrepairTable.append($(data));
              $unrepairTable.css("background", "none");
              $unrepairTable.css("background-color", "white");
         });
         $.get("/ajaxunsolvecomplainttable/", function(data){
              $unsolvecomplaintTable.append($(data));
              $unsolvecomplaintTable.css("background", "none");
              $unsolvecomplaintTable.css("background-color", "white");
         });
         return false;
     });

//------------------------------------首页页面功能-----------------------------------------------


//------------------------------------注册用户功能-----------------------------------------------

    
    var $registedUserList= $("#registedUserList a");
    $registedUserList.click(function(){
         $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
         $userListTable.css("display", "block");
         $userListTable.empty();
         $.get("/ajaxusertable/", function(data){
              var $userListTable= $(".userListTable");
              $userListTable.append($(data));
         });
         $("div.panel-body li").each(function(){
                var $this= $(this);
                if($this.hasClass("active")){
                    $this.removeClass("active");
                }
         });
         $registedUserList.closest("li").addClass("active");
         return false;
    });

    //由于内容会通过Ajax刷新, 需要从父元素那里绑定
    var $userListTable= $("div.userListTable");
    $userListTable.delegate('div.pagination a', 'click', function(){
         var $this= $(this);
         var page= $this.attr("href");
         AppendToUserListTable("/ajaxusertable/"+ page);
         return false;
    });

    var AppendToUserListTable= function(url){
        $userListTable.empty();
        $userListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
        $.get(url, function(data){
              if(data== "failed"){
                    alert("failed");
              }else{
                    $userListTable.append($(data));
                    $userListTable.css("background", "none");
              }
        });
    }

    $userListTable.delegate("th:nth-child(1)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderID";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderID";
        }else{
            order= "orderID";
        }
        AppendToUserListTable("/ajaxusertable/?order="+ order);
        return false;
    });
    $userListTable.delegate("th:nth-child(3)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderRole";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderRole";
        }else{
            order= "orderRole";
        }
        AppendToUserListTable("/ajaxusertable/?order="+ order);
        return false;
    });
    $userListTable.delegate("th:nth-child(5)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderRegTime";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderRegTime";
        }else{
            order= "orderRegTime";
        }
        AppendToUserListTable("/ajaxusertable/?order="+ order);
        return false;
    });

    var IdentifyUser= function(uid, $urole){
        showLoading(false);
        ShowConfirmDialog("认证用户", "是否认证该用户?", 
            function(e, dialog){
                dialog.find("#confirmBtn").unbind("click");
                $.get("/ajaxidentifyuser/?uid="+ uid, function(data){
                    if(data== "failed"){
                        //认证失败. 弹出确认窗口.
                        dialog.css("display", "none");
                        ShowAlertDialog("错误", "认证失败, 服务器内部错误.", function(e, dialog){
                            dialog.css("display", "none");
                            hideLoading();
                        });
                    }else{
                        //认证成功, 关闭对话框, 直接改值(这里不从新取数据).
                        $urole.text("1");
                        dialog.css("display", "none");
                        hideLoading();
                    }
                });
            }, 
            function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            }
        );
        return false;
    };


    $userListTable.delegate("span#opSpanCheck", "click", function(){
        var $this= $(this);
        var $uid= $($this.closest("tr").children("td").get(0)); //uid的td节点.
        var $urole= $($this.closest("tr").children("td").get(2));
        var $floatInfo= CreateFloatDetailedInfo("用户详细信息", null, "认证", function(){ //浮动的显示具体信息的div.
            IdentifyUser($uid.text(), $urole); //现在还无法直接把对话框里的也改掉.
        });
        $.get("/ajaxuserrow/?uid="+ $uid.text(), function(data){
            var $table= $(data);
            AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
        });
        return false;
    });

    $userListTable.delegate("span#opSpanIdentify", "click", function(){
        var $this= $(this);
        var $uid= $($this.closest("tr").children("td").get(0)); //uid的td节点.
        var $urole= $($this.closest("tr").children("td").get(2));
        IdentifyUser($uid.text(), $urole);
    });


//------------------------------------注册用户功能-----------------------------------------------

//------------------------------------维修投诉功能-----------------------------------------------

    var SelectHandler= function(){
        showLoading(false);
        var $select= $("<select class= 'form-control'></select>");
        for(var i= 0; i< 5; i++){
            var $option= $("<option>"+ "业务员"+ i.toString()+ "</option>");
            $select.append($option);
        }
        ShowConfirmDialog("指派处理人员", $select, 
            function(e, dialog){
                /*dialog.find("#confirmBtn").unbind("click");
                $.get("/ajaxselectrepairhandler/?id="+ uid, function(data){
                    if(data== "failed"){
                        //认证失败. 弹出确认窗口.
                        dialog.css("display", "none");
                        ShowAlertDialog("错误", "指派处理人员失败, 服务器内部错误.", function(e, dialog){
                            dialog.css("display", "none");
                            hideLoading();
                        });
                    }else{
                        //认证成功, 关闭对话框, 直接改值(这里不从新取数据).
                        dialog.css("display", "none");
                        hideLoading();
                    }
                });*/
            }, 
            function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            }
        );
        return false;
    };

    var $repairList= $("div#repairAndComplaintList a#repairList");
    var $complaintList= $("div#repairAndComplaintList a#complaintList");
    $repairList.click(function(){
        $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
        $("#tableContent").children(".repairListTable").css("display", "block");
        $("#tableContent").children(".repairListTable").css("background", "url('/static/image/loading.gif') no-repeat center;");
        $("#tableContent").children(".repairListTable").empty();
        $.get("/ajaxrepairtable/", function(data){
            if(data== "failed"){
                //需要把背景图换成错误背景图.
            }else{
                $("#tableContent").children(".repairListTable").append($(data));
                $("#tableContent").children(".repairListTable").css("background", "none");
            }
        });

         $("div.panel-body li").each(function(){
                var $this= $(this);
                if($this.hasClass("active")){
                    $this.removeClass("active");
                }
         });
         $repairList.closest("li").addClass("active");
         return false;
    });

    var $repairListTable= $("#tableContent").find(".repairListTable");
    $repairListTable.delegate('div.pagination a', 'click', function(){
         var $this= $(this);
         $repairListTable.empty();
         var page= $this.attr("href");
         $.get("/ajaxrepairtable/"+ page, function(data){
              $repairListTable.append($(data));
         });
         return false;
    });

    var AppendToRepairListTable= function(url){
        $repairListTable.empty();
        $repairListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
        $.get(url, function(data){
              if(data== "failed"){
                    alert("failed");
              }else{
                    $repairListTable.append($(data));
                    $repairListTable.css("background", "none");
              }
        });
    }
    $repairListTable.delegate("th:nth-child(1)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderID";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderID";
        }else{
            order= "orderID";
        }
        AppendToRepairListTable("/ajaxrepairtable/?order="+ order);
        return false;
    });
    $repairListTable.delegate("th:nth-child(6)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderStatus";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderStatus";
        }else{
            order= "orderStatus";
        }
        AppendToRepairListTable("/ajaxrepairtable/?order="+ order);
        return false;
    });
    $repairListTable.delegate("th:nth-child(7)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderCommitTime";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderCommitTime";
        }else{
            order= "orderCommitTime";
        }
        AppendToRepairListTable("/ajaxrepairtable/?order="+ order);
        return false;
    });

    $repairListTable.delegate("span#opSpanCheck", "click", function(){
        var $this= $(this);
        var $rid= $($this.closest("tr").children("td").get(0)); //rid的td节点.
        // var $urole= $($this.closest("tr").children("td").get(2));
        var $floatInfo= CreateFloatDetailedInfo("报修详细信息", null, "指派维修人员", function(){ //浮动的显示具体信息的div.
            SelectHandler();
        });
        $.get("/ajaxrepairrow/?rid="+ $rid.text(), function(data){
            var $table= $(data);
            AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
        });
        return false;
    });
    $repairListTable.delegate("span#opSpanSelectHandler", "click", function(){
        SelectHandler();
    });

    $complaintList.click(function(){
         $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
        $("#tableContent").children(".complaintListTable").css("display", "block");
        $("#tableContent").children(".complaintListTable").css("background", "url('/static/image/loading.gif') no-repeat center;");
        $("#tableContent").children(".complaintListTable").empty();
        $.get("/ajaxcomplainttable/", function(data){
            if(data== "failed"){
                //需要把背景图换成错误背景图.
            }else{
                $("#tableContent").children(".complaintListTable").append($(data));
                $("#tableContent").children(".complaintListTable").css("background", "none");
            }
        });

         $("div.panel-body li").each(function(){
                var $this= $(this);
                if($this.hasClass("active")){
                    $this.removeClass("active");
                }
         });
         $complaintList.closest("li").addClass("active");
         return false;
    });

    var $complaintListTable= $("#tableContent").find(".complaintListTable");
    $complaintListTable.delegate('div.pagination a', 'click', function(){
         var $this= $(this);
         $complaintListTable.empty();
         var page= $this.attr("href");
         $.get("/ajaxcomplainttable/"+ page, function(data){
              $complaintListTable.append($(data));
         });
         return false;
    });

    var AppendToComplaintListTable= function(url){
        $complaintListTable.empty();
        $complaintListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
        $.get(url, function(data){
              if(data== "failed"){
                    alert("failed");
              }else{
                    $complaintListTable.append($(data));
                    $complaintListTable.css("background", "none");
              }
        });
    }
    $complaintListTable.delegate("th:nth-child(1)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderID";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderID";
        }else{
            order= "orderID";
        }
        AppendToComplaintListTable("/ajaxcomplainttable/?order="+ order);
        return false;
    });
    $complaintListTable.delegate("th:nth-child(4)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderCommitTime";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderCommitTime";
        }else{
            order= "orderCommitTime";
        }
        AppendToComplaintListTable("/ajaxcomplainttable/?order="+ order);
        return false;
    });
    $complaintListTable.delegate("th:nth-child(7)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderStatus";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderStatus";
        }else{
            order= "orderStatus";
        }
        AppendToComplaintListTable("/ajaxcomplainttable/?order="+ order);
        return false;
    });

    $complaintListTable.delegate("span#opSpanCheck", "click", function(){
        var $this= $(this);
        var $cid= $($this.closest("tr").children("td").get(0)); //cid的td节点.
        // var $urole= $($this.closest("tr").children("td").get(2));
        var $floatInfo= CreateFloatDetailedInfo("投诉详细信息", null, "指派处理人员", function(){ 
            SelectHandler();
        });
        $.get("/ajaxcomplaintrow/?cid="+ $cid.text(), function(data){
            var $table= $(data);
            AppendContentToFloatUserDetailedInfoBody($floatInfo, $table);
        });
        return false;
    });

    $complaintListTable.delegate("span#opSpanSelectHandler", "click", function(){
        SelectHandler();
    });
//------------------------------------维修投诉功能-----------------------------------------------


//------------------------------------社区公告功能-----------------------------------------------

    var $releaceNotice= $("#noticeList a#releaceNotice"); //二级菜单中的按键
    var $checkNoticeList= $("#noticeList a#checkNoticeList"); //二级菜单中的按键.
    var $noticeListTable= $("div.noticeListTable"); //放置公告列表的容器.
    var $noticeContent= $("div.noticeContent"); //放置具体公告的容器.
    $checkNoticeList.click(function(){
         $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
         $noticeListTable.css("display", "block");
         $noticeListTable.empty();
         $noticeListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
         $.get("/ajaxnoticetable/", function(data){
              $noticeListTable.append($(data));
              $noticeListTable.css("background", "none");
         });

         $("div.panel-body li").each(function(){
                var $this= $(this);
                if($this.hasClass("active")){
                    $this.removeClass("active");
                }
         });
         $checkNoticeList.closest("li").addClass("active");
         return false;
    });

    
    var AppendToNoticeListTable= function(url){
        $noticeListTable.empty();
        $noticeListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
        $.get(url, function(data){
              if(data== "failed"){
                    alert("failed");
              }else{
                    $noticeListTable.append($(data));
                    $noticeListTable.css("background", "none");
              }
        });
    }

    $noticeListTable.delegate("th:nth-child(1)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderID";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderID";
        }else{
            order= "orderID";
        }
        AppendToNoticeListTable("/ajaxnoticetable/?order="+ order);
        return false;
    });
    $noticeListTable.delegate("th:nth-child(2)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderBio";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderBio";
        }else{
            order= "orderBio";
        }
        AppendToNoticeListTable("/ajaxnoticetable/?order="+ order);
        return false;
    });
    $noticeListTable.delegate("th:nth-child(4)", "click", function(){
        var $this= $(this);
        var order= undefined;
        if($this.children("i").length== 0){
            order= "orderPubTime";
        }else if($this.children("i").hasClass("icon-arrow-down")){
            order= "rorderPubTime";
        }else{
            order= "orderPubTime";
        }
        AppendToNoticeListTable("/ajaxnoticetable/?order="+ order);
        return false;
    });

    $noticeListTable.delegate("span#opSpanCheck", "click", function(){
        $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
        var $this= $(this);
        var $noticeid= $($this.closest("tr").children("td").get(0)); //noticeid的td节点.
        $.get("/ajaxnotice/?noticeid="+ $noticeid.text(), function(data){
            if(data== "failed"){
                showLoading(false);                                
                ShowAlertDialog("错误", "读取公告失败, 服务器内部错误.", function(e, dialog){
                    dialog.css("display", "none");
                    hideLoading();
                    $("#tableContent").children(".tc").each(function(){
                            $(this).css("display", "none");
                     });
                    $noticeListTable.css("display", "block");
                });
            }else{
                $noticeContent.empty();
                $noticeContent.append($(data));
                $noticeContent.find(".noticeReturnBtn").click(function(){
                    $noticeContent.css("display", "none");
                    $noticeListTable.css("display", "block");
                });
                ConvertPureTextToHtml();
                $noticeContent.css("background", "none");
            }
        });
        $noticeContent.css("display", "block");
        $noticeContent.css("background", "url('/static/image/loading.gif') no-repeat center;");
    });

    $noticeListTable.delegate('div.pagination a', 'click', function(){
         var $this= $(this);
         $noticeListTable.empty();
        $noticeListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
         var page= $this.attr("href");
         $.get("/ajaxnoticetable/"+ page, function(data){
              $noticeListTable.append($(data));
              $noticeListTable.css("background", "none");
         });
         return false;
    });


    //接下去是发布公告的代码.
    var $writeNoticeForm= $("form.writeNoticeForm");
    $releaceNotice.click(function(){             
         $("#tableContent").children(".tc").each(function(){
                $(this).css("display", "none");
         });
         $writeNoticeForm.css("display", "block");

         $("div.panel-body li").each(function(){
                var $this= $(this);
                if($this.hasClass("active")){
                    $this.removeClass("active");
                }
         });
         $releaceNotice.closest("li").addClass("active");
         return false;
    });    
    var $submitBtn= $writeNoticeForm.find("#submitBtn");
    $submitBtn.click(function(){
        var nsubject= $writeNoticeForm.find("input#nsubject").val();
        if(nsubject.length== 0|| nsubject.length> 50){  
            showLoading(false); 
            ShowAlertDialog("错误", "请保证公告标题字数在0-50之间.", function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            });
            return false;
        }
        var nbiotopeid= $writeNoticeForm.find("input#nbiotopeid").val();
        if(nbiotopeid.length== 0|| nbiotopeid.length> 20){
            showLoading(false); 
            ShowAlertDialog("错误", "请保证公告所属小区字数在0-20之间.", function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            });
            return false;
        }
        var nposter= $writeNoticeForm.find("input#nposter").val();
        if(nposter.length== 0|| nposter.length> 20){
            showLoading(false); 
            ShowAlertDialog("错误", "请保证公告发布者字数在0-20之间.", function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            });
            return false;
        }
        var nistop= $writeNoticeForm.find("input#nistop").get(0).checked;
        var ncontent= ue.getContentTxt(); //先获取纯文本来判断字数.
        if(ncontent.length== 0|| ncontent.length> 400){     
            showLoading(false); 
            ShowAlertDialog("错误", "请保证公告内容字数在0-400之间.", function(e, dialog){
                dialog.css("display", "none");
                hideLoading();
            });
            return false;
        }
        ncontent= ue.getContent(); //获取完整文本.
        var obj= {
            "nsubject": nsubject,
            "nbiotopeid": nbiotopeid,
            "nposter": nposter,
            "nistop": nistop,
            "ncontent": ncontent
        }
        var notice= JSON.stringify(obj);
        /*notice= notice.replace(/\+/g, "%2B");
        notice= notice.replace(/\&/g, "%26");
        notice= notice.replace(/;/g, "%3B");*/
        notice= encodeURIComponent(notice);
        $.get("/ajaxnewnotice/?notice="+ notice, function(data){
            if(data== "failed"){
                showLoading(false);
                ShowAlertDialog("错误", "内部错误", function(e, dialog){
                    dialog.css("display", "none");
                    hideLoading();
                })
            }else{
                showLoading(false);
                ShowAlertDialog("成功", "添加新公告成功!", function(e, dialog){
                    dialog.css("display", "none");
                    hideLoading();

                    //清空表单.
                    $writeNoticeForm.find("input#nsubject").val("");
                    $writeNoticeForm.find("input#nbiotopeid").val("");
                    $writeNoticeForm.find("input#nposter").val("");
                    $writeNoticeForm.find("input#nistop").get(0).checked= false;
                    ue.setContent("");

                    //返回列表界面.
                    $("#tableContent").children(".tc").each(function(){
                            $(this).css("display", "none");
                     });
                    if($noticeListTable.children().length== 0){
                        //列表之前没有元素, 需要获取.
                        $noticeListTable.css("display", "block");
                        $noticeListTable.css("background", "url('/static/image/loading.gif') no-repeat center;");
                         $.get("/ajaxnoticetable/", function(data){
                              $noticeListTable.append($(data));
                              $noticeListTable.css("background", "none");
                         });
                    }else{
                        //列表之前已经有元素, 直接显示.
                        $noticeListTable.css("display", "block");
                    }
                })
            }
        });
        return false;
    });

//------------------------------------社区公告功能-----------------------------------------------
});