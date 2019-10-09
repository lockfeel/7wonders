/***
 *
 * <!--
 **
 *****************************************
 作者：张文晓@<837045534@qq.com>
 *****************************************
 描述：启动页面布局文件
 *****************************************
 时间：2018-10-15 Add By Mr.z
 *****************************************
 **
 -->
 <!--过度背景-->
 <swiper autoplay        = "{{false}}"
 interval                = "{{500}}"
 circular                = "{{true}}"
 vertical                = "{{true}}"
 duration                = "{{365}}"
 current                 = "{{index}}"
 easing-function         = "default"
 skip-hidden-item-layout = "{{false}}"
 bindchange              = "nextVideo"
 class                   = "swiperBox"
 style                   = "display: {{ (coverStatus || !playStatus) && !showStatus ? 'block':'none'}}"
 >
 <block wx:for="{{videos}}" wx:for-item="muse" wx:key="*this" wx:for-index="x">
 <swiper-item>
 <view id="max-picture">
 <!--加载等待图-->
 <image  class="cover-momo"
 mode="scaleToFill"
 style="width: {{SW}}px;height: {{SH}}px;"
 src="{{muse.cover_pic}}"/>
 </view>
 </swiper-item>
 </block>
 </swiper>
 <!--主播放器-->
 <video id="max-video1"
 class           = "video"
 src             = "{{item.video_url}}"
 controls        = "{{false}}"
 loop            = "{{true}}"
 object-fit      = "cover"
 poster          = "{{coverImages}}"
 bindwaiting     = 'progressW'
 autoplay        = "{{true}}"
 show-progress   = "{{true}}"
 bindplay        = 'progressP'
 style           = "display:{{ !coverStatus && !showStatus  ? 'block' : 'none' }}">
 <!--主播操作封面-->
 <cover-view class="controls">
 <cover-view class="read-next"
 style="padding-top:{{ paddingTop - 50 }}px;height: calc(100vh - {{ paddingTop - 50 }}px);"
 bindtouchstart = "handleStart"
 bindtouchend   = "handleEnd"
 data-source    = "index">
 <cover-view class="playx">
 <cover-image class="img user-pic" src="{{item.user_pic}}"/>
 <cover-view class="userNameIm1">{{item.user_nickname}}</cover-view>
 </cover-view>
 <cover-view class="video-desc">
 <cover-view>{{item.title ? item.title : '一切尽在不言中～～～'}}</cover-view>
 </cover-view>
 <cover-view class="music-desc">
 <cover-image class="" src="../../image/dida.png"/>
 <cover-view>{{item.user_nickname}}的视频原声</cover-view>
 </cover-view>
 </cover-view>
 <cover-view class="tagbar" style="padding-top:{{paddingTop}}px;height: calc(100vh - {{paddingTop}}px);">
 <cover-view  class="think"></cover-view>
 <cover-image class="iconx2" src="../../image/live.png" bindtap="toLive"/>
 <cover-view  class="licks">直播</cover-view>
 <cover-image class="iconx2" src="../../image/thumb.png"/>
 <cover-view  class="licks">{{item.thumb_count}}</cover-view>
 <button data-name="shareBtn" open-type="share"><cover-image src="../../image/sharex.png"/></button>
 <cover-view  class="licks">{{item.share_count}}</cover-view>
 <cover-image class="iconx2" src="../../image/music.png" bindtap="toLive"/>
 <cover-view  style="height:36px;"></cover-view>
 </cover-view>
 <cover-view class='clear'></cover-view>
 </cover-view>
 </video>




 * */