document.getElementById("inputData").value = "";
var submitNum=0;
function spiltInput()
{
    var str=document.getElementById("inputData").value;
    if(str==null)
    {
        alert("输入数据为空");
    }
    str=str.split("\n\n");
    for(var i=0;i<str.length;i++)
    {
        buildTree(str[i],i,submitNum);
    }
    submitNum++
}
function buildTree(str,num,submitNum)
{
    var supervisorPatt=/导师：.*/g;
    var doctorPatt=/\d{4}级博士生：.*/g;
    var postgraduatePatt=/\d{4}级硕士生：.*/g;
    var undergraduatePatt=/\d{4}级本科生：.*/g;
    var numberPatt=/\d{4}/g;
    var supervisor=str.match(supervisorPatt);
    if(supervisor==null) 
    {
       alert("输入格式不正确");
       throw new Error(result.error_code);
    }
    var treeDiv=document.createElement('div');
    treeDiv.setAttribute("id","tree"+submitNum+num);
    document.getElementById("studyTree").appendChild(treeDiv);
    $(function(){$("#tree"+submitNum+num+"").jstree({
        plugins : ["types","contextmenu"], 
        'core' : {
                    //允许callback，为了后面进行创建、重命名、删除、移动或复制等操作
                    "check_callback" : true,},
      "types": {
          "default" : {
            "icon" :false,  // 关闭默认图标
          },
      },
      'contextmenu':{
                    'items' : {
                        'add':{
                            'label':'新增分类',
                            'action':function(obj){
                                //reference获取当前选中节点的引用
                                var inst = jQuery.jstree.reference(obj.reference);
                                //通过get_node方法获取节点的信息，类似于实例对象
                                var clickedNode = inst.get_node(obj.reference);
                                /*
                                    inst.create_node 参数1:父节点  参数2:新节点的数据
                                    参数3: 1）first：当前节点下的头部新增节点
                                           2）last：当前节点下的尾部新增节点
                                           3）before：当前节点同级的上部新增节点
                                           4）after：当前节点同级的下部新增节点
                                    参数4:回调函数
                                    参数5:Boolean类型,内部参数，指示父节点是否成功加载
                                */  
                                var newNode = inst.create_node(clickedNode,
                                    {    //'id': 'ajson20',
                                        //'parent' : 'ajson2',
                                        'icon' : 'jstree-file',
                                        'text':'新节点'},'last',function(node){
                                        //回调返回创建后点节点，给新节点改名
                                        inst.edit(node,node.val);
                                    },'');
                            }
                        },
                        'rename':{
                            'label':'修改分类',
                            'action':function(obj){
                                var inst = jQuery.jstree.reference(obj.reference);
                                var clickedNode = inst.get_node(obj.reference);    
                                inst.edit(obj.reference,clickedNode.val);
                            }
                        },
                        'delete':{
                            "label": "删除分类",
                            'action':function(obj){
                                var inst = jQuery.jstree.reference(obj.reference);
                                var clickedNode = inst.get_node(obj.reference);
                                inst.delete_node(obj.reference);
                            }
                        }
                    }
                }
      });});
    var treeRoot=document.createElement('ul');
    treeRoot.setAttribute("id","root"+submitNum+num);
    document.getElementById("tree"+submitNum+num).appendChild(treeRoot);
    supervisor=supervisor.join("").split("：");
    var ele = document.createElement('li');
    ele.setAttribute("id","supervisor"+submitNum+num);
    ele.innerHTML=supervisor[1];
    document.getElementById("root"+submitNum+num).appendChild(ele);
    var doctor=str.match(doctorPatt);
    var postgraduate=str.match(postgraduatePatt);
    var undergraduate=str.match(undergraduatePatt);
    if(doctor||postgraduate||undergraduate)
    {
        var degree = document.createElement('ul');
        degree.setAttribute("id","degree"+submitNum+num);
        document.getElementById("supervisor"+submitNum+num).appendChild(degree);
    }
    if(doctor)
    {
        var doctorDegree=document.createElement('li');
        doctorDegree.setAttribute("id","doctorDegree"+submitNum+num);
        doctorDegree.innerHTML="博士生";
        document.getElementById("degree"+submitNum+num).appendChild(doctorDegree);
        var doctorGradeUl=document.createElement('ul');
        doctorGradeUl.setAttribute("id","doctorGradeUl"+submitNum+num);
        document.getElementById("doctorDegree"+submitNum+num).appendChild(doctorGradeUl);
        for(var i=0;i<doctor.length;i++)
        {
            var doctorStr=doctor[i];
            doctorStr=doctorStr.split("：");
            var doctorGradeLi=document.createElement('li');
            doctorGradeLi.innerHTML=doctorStr[0].match(numberPatt);
            doctorGradeLi.setAttribute("id","doctorGradeLi"+submitNum+num+i);
            document.getElementById("doctorGradeUl"+submitNum+num).appendChild(doctorGradeLi);
            var doctorNameUl = document.createElement('ul');
            doctorNameUl.setAttribute("id","doctorNameUl"+submitNum+num+i);
            document.getElementById("doctorGradeLi"+submitNum+num+i).appendChild(doctorNameUl);
            var nameValue=doctorStr[1].split("、");
            for(var j=0;j<nameValue.length;j++)
            {
                var doctorNameLi=document.createElement('li');
                doctorNameLi.setAttribute("id","doctorNameLi"+submitNum+num+i+j);
                doctorNameLi.innerHTML=nameValue[j];
                document.getElementById("doctorNameUl"+submitNum+num+i).appendChild(doctorNameLi);
            }
        }
    }
    if(postgraduate)
    {
        var postgraduateDegree=document.createElement('li');
        postgraduateDegree.setAttribute("id","postgraduateDegree"+submitNum+num);
        postgraduateDegree.innerHTML="硕士生";
        document.getElementById("degree"+submitNum+num).appendChild(postgraduateDegree);
        var postgraduateGradeUl=document.createElement('ul');
        postgraduateGradeUl.setAttribute("id","postgraduateGradeUl"+submitNum+num);
        document.getElementById("postgraduateDegree"+submitNum+num).appendChild(postgraduateGradeUl);
        for(var i=0;i<postgraduate.length;i++)
        {
            var postgraduateStr=postgraduate[i];
            postgraduateStr=postgraduateStr.split("：");
            var postgraduateGradeLi=document.createElement('li');
            postgraduateGradeLi.innerHTML=postgraduateStr[0].match(numberPatt);
            postgraduateGradeLi.setAttribute("id","postgraduateGradeLi"+submitNum+num+i);
            document.getElementById("postgraduateGradeUl"+submitNum+num).appendChild(postgraduateGradeLi);
            var postgraduateNameUl = document.createElement('ul');
            postgraduateNameUl.setAttribute("id","postgraduateNameUl"+submitNum+num+i);
            document.getElementById("postgraduateGradeLi"+submitNum+num+i).appendChild(postgraduateNameUl);
            var nameValue=postgraduateStr[1].split("、");
            for(var j=0;j<nameValue.length;j++)
            {
                var postgraduateNameLi=document.createElement('li');
                postgraduateNameLi.setAttribute("id","postgraduateNameLi"+submitNum+num+i+j);
                postgraduateNameLi.innerHTML=nameValue[j];
                document.getElementById("postgraduateNameUl"+submitNum+num+i).appendChild(postgraduateNameLi);
            }
        }
    }
    if(undergraduate)
    {
        var undergraduateDegree=document.createElement('li');
        undergraduateDegree.setAttribute("id","undergraduateDegree"+submitNum+num);
        undergraduateDegree.innerHTML="本科生";
        document.getElementById("degree"+submitNum+num).appendChild(undergraduateDegree);
        var undergraduateGradeUl=document.createElement('ul');
        undergraduateGradeUl.setAttribute("id","undergraduateGradeUl"+submitNum+num);
        document.getElementById("undergraduateDegree"+submitNum+num).appendChild(undergraduateGradeUl);
        for(var i=0;i<undergraduate.length;i++)
        {
            var undergraduateStr=undergraduate[i];
            undergraduateStr=undergraduateStr.split("：");
            var undergraduateGradeLi=document.createElement('li');
            undergraduateGradeLi.innerHTML=undergraduateStr[0].match(numberPatt);
            undergraduateGradeLi.setAttribute("id","undergraduateGradeLi"+submitNum+num+i);
            document.getElementById("undergraduateGradeUl"+submitNum+num).appendChild(undergraduateGradeLi);
            var undergraduateNameUl = document.createElement('ul');
            undergraduateNameUl.setAttribute("id","undergraduateNameUl"+submitNum+num+i);
            document.getElementById("undergraduateGradeLi"+submitNum+num+i).appendChild(undergraduateNameUl);
            var nameValue=undergraduateStr[1].split("、");
            for(var j=0;j<nameValue.length;j++)
            {
                var undergraduateNameLi=document.createElement('li');
                undergraduateNameLi.setAttribute("id","undergraduateNameLi"+submitNum+num+i+j);
                undergraduateNameLi.innerHTML=nameValue[j];
                document.getElementById("undergraduateNameUl"+submitNum+num+i).appendChild(undergraduateNameLi);
            }
        }
    }
}
function empty()
{
    $("#inputData").val("");
    document.getElementById('studyTree').innerHTML = "";
    $('studyTree').html("");
}


