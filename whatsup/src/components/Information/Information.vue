<template>
    <el-container class="all">
        <el-header style="padding: 0px;">
          <el-menu :default-active="checkStatus"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect">
            <el-menu-item index="1">返回主页</el-menu-item>
          </el-menu>
        </el-header>
        <el-container>
        <el-aside width="300px" style="background: rgb(178, 190, 194);">
          <div style="overflow:hidden; width:300px; height: 100px; margin-top: 20px;">
            <div>
              <div class="cover" @click="dialogHeadImageVisible = true">更换头像</div>
              <el-image class="headimage" :src="url"></el-image>
            </div>
            <div style="margin-top: 25px; text-align: left; width: 190px; height: 40px; float: right; border: 0px solid yellow;">
              <p style="margin-bottom: 3px; display: inline-block; font-weight: bolder; font-size: 15pt;">昵称：{{infor.username}}</p>
              <i @click="dialogInforVisible = true" class="el-icon-setting seticon"></i>
              <p style="font-size: 13pt; margin-top: 0px;">ID: {{infor.id}}</p>
            </div>
          </div>
          <div style="border: 0px solid yellow; overflow: hidden">
            <p style="float: left; margin-bottom: 3px; margin-left: 15px; display: inline-block; font-size: 12pt;">账户余额： {{money}}</p>
            <el-button style="padding: 3px 4px; float: right; margin-right: 12px;" size="mini" round @click="dialogTopupVisible = true">充值</el-button>
          </div>
          <div style="margin-top:10px; width:300px; height: 55px;border: 0px solid yellow;">
            <div class="part">
              <div class="number">{{ sponsorDutiesNum }}</div>
              <span>已发布任务</span>
            </div>
            <div class="part">
              <div class="number">{{ acceptDutiesNum }}</div>
              <span>待完成任务</span>
            </div>
            <div class="part">
              <div class="number">{{ doneDutiesNum }}</div>
              <span>已确认任务</span>
            </div>
            <div class="part">
              <div class="number">{{ finishedDutiesNum }}</div>
              <span>已完成任务</span>
            </div>
          </div>
          <div style="text-align: left; padding: 10px; margin-top: 20px;">
            <p style="display: inline-block; margin-bottom: 0px; font-weight: bolder; font-size: 15pt;">组织</p>
            <i style="margin: 5px; float: right" class="el-icon-plus"></i>
            <hr style="background-color:black; height:1px; opacity: 0.4; border:none; margin: 5px 5px;">
            <p style="padding: 2px"><span>中山大学团委</span><span style="float: right">管理员</span></p>
            <p style="padding: 2px"><span>中山大学团委</span><span style="float: right">管理员</span></p>
          </div>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick" style="margin: 0 auto;">
            <el-tab-pane label="个人信息" name="first">
              <p style="text-align:left; margin: 30px 80px 10px 80px;">  昵称  ： {{infor.username}}</P><hr style="margin: 0 80px; opacity: 0.4">
              <p style="text-align:left; margin: 10px 80px;">  ID    ： {{infor.id}}</P><hr style="margin: 0 80px; opacity: 0.4">
              <p style="text-align:left; margin: 10px 80px;">  手机  ： {{infor.phone}}</P><hr style="margin: 0 80px; opacity: 0.4">
              <p style="text-align:left; margin: 10px 80px;">  邮箱  ： {{infor.email}}</P><hr style="margin: 0 80px; opacity: 0.4">
              <p style="text-align:left; margin: 10px 80px;">  身份  ： {{infor.status}}</P><hr style="margin: 0 80px; opacity: 0.4">
              <p style="text-align:left; margin: 10px 80px;">创建时间： {{infor.createTime}}</P>
            </el-tab-pane>
            <el-tab-pane label="已发布任务" name="second">
              <div>
                <el-row>
                  <el-col :span="6" v-for="(o, index) in sponsorPageNum" :key="o" :offset="index % 2 == 0 ? 1 : 1">
                    <el-card @click.native="detail(sponsorDuties[index].did)" :body-style="{ padding: '0px' }" class="card">
                      <img :src="url2" class="image">
                      <div style="padding: 10px;">
                        <span>{{ sponsorDuties[index].dtitle }}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ sponsorDuties[index].dintroduction }}</time>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <el-pagination
                @current-change="handleCurrentChangeSponsor"
                style="margin-top: 20px;"
                background
                :hide-on-single-page='true'
                :page-size="6"
                :pager-count="5"
                layout="prev, pager, next"
                :total=sponsorDutiesNum>
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="已接受任务" name="third">
              <div>
                <el-row>
                  <el-col :span="6" v-for="(o, index) in acceptPageNum" :key="o" :offset="index % 2 == 0 ? 1 : 1">
                    <el-card @click.native="detail(acceptDuties[index].did)" :body-style="{ padding: '0px' }" class="card">
                      <img :src="url2" class="image">
                      <div style="padding: 10px;">
                        <span>{{ acceptDuties[index].dtitle }}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ acceptDuties[index].dintroduction }}</time>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <el-pagination
                @current-change="handleCurrentChangeAccepter"
                style="margin-top: 20px;"
                background
                :hide-on-single-page='true'
                :page-size="6"
                :pager-count="5"
                layout="prev, pager, next"
                :total=acceptDutiesNum+finishedDutiesNum+doneDutiesNum>
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-dialog title="修改头像" :visible.sync="dialogHeadImageVisible" :before-close="refreshPhoto" width="400px">
          <v-userPhoto @methodUploadSucceed="Succeed"></v-userPhoto>
        </el-dialog>
        <el-dialog title="修改个人信息" :visible.sync="dialogInforVisible">
          <v-reviseInfor 
            :id="uid"
            :username="infor.username"
            :email="infor.email"
            :phone="infor.phone"
            :status="infor.status"
            @methodReviseSucceed="Succeed"
            @methodReviseFailed="ReviseFailed"
            ref='reviseInfor'
          ></v-reviseInfor>
        </el-dialog>
        <el-dialog title="充值" :visible.sync="dialogTopupVisible">
          <v-topup @methodTopupSucceed="Succeed" @methodTopupFailed="TopupFailed"></v-topup>
        </el-dialog>
      </el-container>
    </el-container>
</template>

<style scoped>
  .all{
    background-color: white !important;
    width: 1000px;
    height: 100%;
    min-height: 100%;
    border: 0px solid red;
    margin: 0 10%;
    position: absolute; 
  }

  .leftside{
    height: 100%; 
    background: rgb(178, 190, 194);
    border: 0px solid red;
    position: absolute; 
    width: 300px;
  }

  .rightside{
    margin-left: 300px; 
    border: 0px solid black; 
    width: 700px;
  }

  .headimage{
    margin: 10px 10px;
    width: 80px;
    height: 80px; 
    float: left;
    border: 0px solid black;
  }

  .cover {
    position: absolute;
    margin: 10px;
    width: 80px;
    height: 80px; 
    text-align: center;
    vertical-align: center;
    line-height: 80px;
    opacity: 0;
    background-color: black;
    color: white;
    font-size: 10pt;
    z-index: 10;
  }

  .cover:hover{
    opacity: 0.6;
    cursor: pointer;
  }

  .seticon{
    margin-right: 10px;
    margin-top: 10px; 
    float: right
  }

  .seticon:hover{
    cursor: pointer;
  }

  .card{
    margin: 10px 0px;
  }
  
  .card:hover{
    cursor: pointer;
  }

  .part{
    width: 70px;
    height: 55px;
    font-size: 7pt;
    border: 0px solid red;
    text-align: center;
    margin: 5px 0px;
    display: inline-block;
  }

  .number{
    border: 0px solid black;
    font-size: 17pt;
    font-weight: bolder;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
  import userPhoto from './userPhoto.vue'
  import reviseInfor from './reviseInfor.vue'
  import topup from './Topup.vue'
  
  export default {
    inject: ["reload"],
    components: {
      "v-userPhoto":userPhoto,
      "v-reviseInfor":reviseInfor,
      "v-topup":topup,
    },
    beforeCreate() {
      
    },
    mounted: function () {
    
      this.$http.get('api/users/user/'+this.uid).then(function(response){
        this.infor.id = response.data.id;
        this.infor.username = response.data.username;
        this.infor.phone = response.data.phone;
        this.infor.email = response.data.email;
        this.infor.status = response.data.status;
        this.infor.createTime = response.data.createTime;
        console.log(this.id);
      }, function(response){

      });

      this.$http.get('api/duties/screen?pageNumber=1&countPerPage=6&selectBySponsor='+this.uid).then(function(response){
        this.sponsorDuties = response.data.content;
        this.sponsorPageNum = response.data.count;
      }, function(response){

      });

      this.$http.get('api/duties/screen?pageNumber=1&countPerPage=6&selectByAccepter='+this.uid).then(function(response){
        this.acceptDuties = response.data.content;
        this.acceptPageNum = response.data.count;
      }, function(response){

      });

      this.$http.get('api/trades').then(function(response){
        this.money = response.data.balance;
      }, function(response){

      });

      this.$http.get('api/duties/getDutyNum').then(function(response){
        for( let nums of response.data.data){
          if(nums.status == 'accepted'){
            this.acceptDutiesNum = nums['count(*)'];
          }
          if(nums.status == 'done'){
            this.doneDutiesNum = nums['count(*)'];
          }
          if(nums.status == 'published'){
            this.sponsorDutiesNum = nums['count(*)'];
          }
          if(nums.status == 'finish'){
            this.finishedDutiesNum = nums['count(*)'];
          }
        }
      }, function(response){

      });

    },
    data() {
      return {
        infor: {
          id: "",
          username: "",
          phone: "",
          email: "",
          status: "",
          createTime: "",
        },
        url: '',
        url2: './../../static/ad3.gif',
        activeName: 'first',
        currentDate: 'Sun May 19 2019',
        acceptDutiesNum : 0,
        sponsorDutiesNum : 0,
        finishedDutiesNum : 0,
        doneDutiesNum : 0,
        uid: null,
        sponsorPageNum: '',
        acceptPageNum: '',
        money: '',
        acceptDuties: [],
        sponsorDuties: [],
        checkStatus: "1",

        dialogHeadImageVisible: false,
        dialogInforVisible: false,
        dialogTopupVisible: false,
      };
    },
    created: function() {
      this.uid = this.$route.query.uid;
      this.url = 'api/photo/UserPhoto/'+this.uid+ "?t=" + Math.random(),
      //alert(this.$route.query.uid);
      console.log(this.$route.query.uid);
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      refreshPhoto(done){
        this.url = 'api/photo/UserPhoto/'+this.uid + "?t=" + Math.random();
        this.reload();
        done();
      },
      /*ReviseSucceed: function (str) {
        this.reload();
      },*/
      ReviseFailed: function (str) {
        this.dialogInforVisible = false;
      },
      Succeed: function () {
        this.reload();
      },
      TopupFailed: function (str) {
        this.dialogTopupVisible = false;
      },
      handleSelect(key, keyPath) {
        if(key == "1"){
          this.$router.push({path:'/'});
        }
      },
      handleCurrentChangeSponsor(val) {
        this.$http.get('api/duties/screen?pageNumber='+val+'&countPerPage=6&selectBySponsor='+this.uid).then(function(response){
          this.sponsorDuties = response.data.content;
          this.sponsorPageNum = response.data.count;
        }, function(response){

        });
      },
      handleCurrentChangeAccepter(val) {
        this.$http.get('api/duties/screen?pageNumber='+val+'&countPerPage=6&selectByAccepter='+this.uid).then(function(response){
          this.acceptDuties = response.data.content;
          this.acceptPageNum = response.data.count;
        }, function(response){

        });
      },
      detail:function (did){
        this.$router.push({name:'TaskDetail',params:{dutyid: did}});
      }
    }
  }
</script>