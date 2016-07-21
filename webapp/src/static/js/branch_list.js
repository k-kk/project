;
(function() {

  'use strict';

  var location = window.location;
  var doc = window.document;
  var oHtml = document.documentElement;
  var screenWidth = oHtml.clientWidth;
  var screenHeight = oHtml.clientHeight;
  var oBody = doc.querySelectorAll('body')[0];
  var load = document.querySelector('#load');
  var branchInfo = {
    name: '分部列表',
    list: [{
      name: '哈尔滨分部',
      phone: '0451-86639283',
      email: 'harbin@zbglobal.cn',
      qq: 80046423,
      address: '黑龙江省哈尔滨南岗区哈尔滨大街与南兴街交汇处金爵万象1号楼607室'
    }, {
      name: '长春分部',
      phone: '15002499315',
      email: 'changchun@zbglobal.cn',
      qq: 2862058307,
      address: '吉林省长春市朝阳区前进大街2699号吉林大学前卫校区外语楼506室',
      address2: '长春市硅谷大街硅谷大厦106室（0431-81308831）'
    }, {
      name: '沈阳分部',
      phone: '024-22975506',
      email: 'shenyang@zbglobal.cn',
      qq: 2591797510,
      address: '辽宁省沈阳市和平区文化路3号巷11号东北大学东门易购大厦4楼417室'
    }, {
      name: '大连分部',
      phone: '0411-39022497',
      email: 'dalian@zbglobal.cn',
      qq: 2269408352,
      address: '辽宁省大连市沙河口区学苑广场1号软件园18号楼A区605室'
    }, {
      name: '北京分部',
      phone: '010-62120842 62124759',
      email: 'student@zbglobal.cn',
      qq: 4006261716,
      address: '北京市海淀区北三环西路甲30号双天大厦308室'
    }, {
      name: '天津分部',
      phone: '022-23246826',
      email: 'tianjin_student@zbglobal.cn',
      qq: 1500398231,
      address: '天津市小白楼CBD（南京路和合肥道）富力中心A座1906室'
    }, {
      name: '石家庄分部',
      phone: '0311-68032076',
      email: 'shijiazhuang_student@zbglobal.cn',
      qq: 2426252615,
      address: '河北省石家庄市新华区学府路47号河北经贸大学三办斜对过'
    }, {
      name: '秦皇岛分部',
      phone: '0335-5892654',
      email: 'qinhuangdao@zbglobal.cn',
      qq: 2284085025,
      address: '河北省秦皇岛市海港区河北大街360号河北科技师范学院逸夫楼A804'
    }, {
      name: '保定分部',
      phone: '0312-5886941',
      email: 'baoding@zbglobal.cn',
      qq: 2960284373,
      address: '河北省保定市北市区七一东路河大新区坤舆园综合楼(学生餐厅)北侧赫达培训4楼ACCA办公室'
    }, {
      name: '太原分部',
      phone: '0351-5613021',
      email: 'taiyuan@zbglobal.cn',
      qq: 2264288297,
      address: '山西省太原市小店区平阳路南内环街金茂大厦B座25-B室'
    }, {
      name: '上海分部',
      phone: '021-61992165',
      email: 'shanghai_edu@zbglobal.cn',
      qq: 364784518,
      address: '上海市黄浦区徐家汇路358号黄浦工人俱乐部四楼405室'
    }, {
      name: '西安分部',
      phone: '029-88767664',
      email: 'xian@zbglobal.cn',
      qq: 1848881522,
      address: '陕西省西安市高新区唐延路与科技路交汇处旺座国际城E座16层1603'
    }, {
      name: '郑州分部',
      phone: '13071082186',
      email: 'zhengzhou@zbglobal.cn',
      qq: 800025880,
      address: '河南省郑州市中原区桐柏路棉纺路锦艺国际中心B座701室'
    }, {
      name: '开封分部',
      phone: '13323650635',
      email: 'kaifeng_mkting@zbglobal.cn',
      qq: 13323650635,
      address: '河南省开封市河南大学金明校区创业中心二楼D5'
    }, {
      name: '济南分部',
      phone: '0531-58782677',
      email: 'jinan@zbglobal.cn',
      qq: 2330010554,
      address: '山东省济南市市中区英雄山路167号17号楼2楼中博诚通教育培训学校'
    }, {
      name: '青岛分部',
      phone: '0532-89071278',
      email: 'qingdao@zbglobal.cn',
      qq: 502697044,
      address: '山东省青岛市崂山区秦岭路18号国展财富中心2号楼410室'
    }, {
      name: '烟台分部',
      phone: '0535-6342549',
      email: 'yantai@zbglobal.cn',
      qq: 2954001652,
      address: '山东省烟台市莱山区烟台大学外国语学院504室'
    }, {
      name: '威海分部',
      phone: '0631-3884671',
      email: 'weihai@zbglobal.cn',
      qq: 2382798134,
      address: '山东省威海市高新技术开发区文化西路哈工大研究院2号楼108室'
    }, {
      name: '合肥分部',
      phone: '0551-63861847',
      email: 'hefei@zbglobal.cn',
      qq: 1557817432,
      address: '安徽省合肥市经开区大学城九龙路111号安徽大学新校区磬苑宾馆一楼'
    }, {
      name: '蚌埠分部',
      phone: '0552-3867180',
      email: 'bengbu@zbglobal.cn',
      qq: 2964588194,
      address: '安徽省蚌埠市蚌山区财院路214所北门ACCA办公室'
    }, {
      name: '芜湖分部',
      phone: '18130612002',
      email: 'wuhu@zbglobal.cn',
      qq: 2781459071,
      address: '安徽省芜湖市安徽师范大学花津校区行知楼6号楼5楼'
    }, {
      name: '贵阳分部',
      phone: '18198551102',
      email: 'guiyang@zbglobal.cn',
      qq: 2829365246,
      address: '贵州省贵阳市花溪区大学城贵州财经大学崇德楼2楼'
    }, {
      name: '海口分部',
      phone: '0898-31941629',
      email: 'haikou@zbglobal.cn',
      qq: 2331564418,
      address: '海南省海口市美兰区人民大道58号海南大学社科楼B-303室'
    }, {
      name: '南京分部',
      phone: '025-83179776',
      email: 'nanjing_student@zbglobal.cn',
      qq: 2080421913,
      address: '江苏省南京市玄武区中央路284号金谷大厦700室'
    }, {
      name: '徐州分部',
      phone: '0516-83887332',
      email: 'liujinjing@zbglobal.cn',
      qq: 1581288483,
      address: '江苏省徐州市泉山区矿大西门南都国际4号楼806室'
    }, {
      name: '镇江分部',
      phone: '18013447977',
      email: 'zhenjiang_mkting@zbglobal.cn',
      qq: 2080421913,
      address: '江苏省镇江市江苏科技大学南校区学工办楼312室'
    }, {
      name: '苏州分部',
      phone: '0512-62806629',
      email: 'suzhou_student@zbglobal.cn',
      qq: 1286513431,
      address: '江苏省苏州市独墅湖高教区西交大科技园D2幢114室'
    }, {
      name: '张家港分部',
      phone: '021-61992165',
      email: 'shanghai_edu@zbglobal.cn',
      qq: 364784518,
      address: ''
    }, {
      name: '无锡分部',
      phone: '0510-85183660',
      email: 'wuxi@zbglobal.cn',
      qq: 3183526488,
      address: '江苏省无锡市滨湖区锦溪路99号江南大学国家大学科技园C区2号楼201-2号'
    }, {
      name: '杭州分部',
      phone: '0571-85122832',
      email: 'hangzhou@zbglobal.cn',
      qq: 1878817899,
      address: '浙江省杭州市下沙经济开发区新加坡科技园2幢908室'
    }, {
      name: '宁波分部',
      phone: '0574-28893219',
      email: 'ningbo@zbglobal.cn',
      qq: 2991521890,
      address: '浙江省宁波市鄞州区南部商务区天童南路535红巨大厦23F'
    }, {
      name: '武汉分部',
      phone: '027-87866613',
      email: 'wuhan@zbglobal.cn',
      qq: 413689657,
      address: '湖北省武汉市洪山区民族大道124号龙安港汇城A座2401室'
    }, {
      name: '长沙分部',
      phone: '0731-88684750',
      email: 'changsha@zbglobal.cn',
      qq: 2924307481,
      address: '湖南省长沙市岳麓区湖南大学北校区2教后面GR商学桥102室'
    }, {
      name: '成都分部',
      phone: '028-61679009',
      email: 'chengdu@zbglobal.cn',
      qq: 2962313293,
      address: '四川省成都市青羊区青龙街27号铂金城2号楼14楼1009室'
    }, {
      name: '重庆分部',
      phone: '18983461606',
      email: 'chongqing@zbglobal.cn',
      qq: 2741895074,
      address: '重庆市永川区光彩大道368号'
    }, {
      name: '南昌分部',
      phone: '0791-86819153',
      email: 'nanchang@zbglobal.cn',
      qq: 3197747486,
      address: '江西省南昌市昌北经开区枫林大道世纪新宸中心501室'
    }, {
      name: '南宁分部',
      phone: '0771-3265520',
      email: 'nanning@zbglobal.cn',
      qq: 2752260840,
      address: '广西南宁市西乡塘区大学东路188号广西民族大学商学院121办公室'
    }, {
      name: '广州分部',
      phone: '020-38662047',
      email: 'guangzhou_student@zbglobal.cn',
      qq: 1209739215,
      address: '广东省广州市天河区龙口中路194号天惠大厦三楼309室(地铁华师站D口)'
    }, {
      name: '深圳分部',
      phone: '0755-25865142',
      email: 'shenzhen_student@zbglobal.cn',
      qq: 1404441018,
      address: '广东省深圳市福田区竹子林益华大厦B栋三楼A02室'
    }, {
      name: '珠海分部',
      phone: '0756-3233599',
      email: 'zhuhai@zbglobal.cn',
      qq: 2365990048,
      address: '广东省珠海市香洲区唐家湾金凤路18号北师大珠海分校粤华三栋'
    }, {
      name: '厦门分部',
      phone: '0592-3167971',
      email: 'xiamen@zbglobal.cn',
      qq: 2085576667,
      address: '福建省厦门市集美区石鼓路84号春麟酒店716室（集美菜市场对面）'
    }, {
      name: '福州分部',
      phone: 13163878749,
      email: 'xiamen@zbglobal.cn',
      qq: 2328652115,
      address: '福建省福州市福州大学至诚学院地矿楼107室'
    }, {
      name: '昆明分部',
      phone: '0871-68415455',
      email: 'kunming@zbglobal.cn',
      qq: 1744635154,
      address: '云南省昆明市五华区一二一大街243号电大写字楼408(云师大正门对面)'
    }, {
      name: '柳州分部',
      phone: '18077205737',
      qq: 712625754,
      email: 'liuzhou@zbglobal.cn',
      address: '广西柳州市广西科技大学第四教学楼4B711室'
    }, {
      name: '桂林分部',
      phone: '0773-2316020',
      qq: 1764885172,
      email: 'guilin@zbglobal.cn',
      address: '广西桂林市七星区桂林电子科技大学金鸡岭校区9教408室'
    }, {
      name: '呼和浩特分部',
      phone: '0471-5300236',
      qq: 3281701958,
      email: 'huhehaote@zbglobal.cn',
      address: '内蒙古呼和浩特市北二环内蒙古财经大学综合楼11楼1112办公室'
    }, {
      name: '张家口分部',
      phone: '0313-4164511',
      qq: 2931814525,
      email: 'zhangjiakou@zbglobal.cn',
      address: '河北北方学院东校区女生公寓3号楼对面'
    }, {
      name: '唐山分部',
      phone: '0315-2121124',
      qq: 3188369792,
      email: 'tangshan@zbglobal.cn',
      address: '河北省唐山市路北区大学西道9号唐山学院北校区A310'
    }, {
      name: '兰州分部',
      phone: '0931-7836926',
      qq: 3297709651,
      email: 'lanzhou@zbglobal.cn',
      address: '兰州财经大学和平校区ACCA教育中心205办公室'
    }, {
      name: '百色分部',
      phone: '0776-2983334',
      qq: 319813025,
      email: 'baise@zbglobal.cn',
      address: '广西百色市右江区百色学院澄碧校区实验中心402-1室'
    }]
  };



  function init() {

    pageInit();
    bindEvents();

  }

  function styleInit() {

    setTimeout(function() {
      load.classList.add('hide');
    }, 500);

  }

  function pageInit() {

    var html = template('listTemplate', branchInfo);
    var branchList = document.querySelector('#branchList');

    branchList.innerHTML = html;

    styleInit();

  }

  function bindEvents() {


  }

  window.onload = init;

})();
