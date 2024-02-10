
//=========================テキストのカウントアップ+バーの設定=========================
var bar = new ProgressBar.Line(splash_text, {//id名を指定
  easing: 'easeInOut',            //アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
  duration: 1000,                 //時間指定(1000＝1秒)
  strokeWidth: 0.2,               //進捗ゲージの太さ
  color: '#555',                  //進捗ゲージのカラー
  trailWidth: 0.2,                //ゲージベースの線の太さ
  trailColor: '#bbb',             //ゲージベースの線のカラー
  text: {                         //テキストの形状を直接指定
    style: {                      //天地中央に配置
      position: 'absolute',
      left: '50%',
      top: '50%',
      padding: '0',
      margin: '-30px 0 0 0',      //バーより上に配置
      transform:'translate(-50%,-50%)',
      'font-size':'1rem',
      color: '#fff',
    },
    autoStyleContainer: false     //自動付与のスタイルを切る
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
  }
});

//アニメーションスタート
bar.animate(1.0, function () {    //バーを描画する割合を指定します 1.0 なら100%まで描画します
  $("#splash").delay(500).fadeOut(800);                  //アニメーションが終わったら#splashエリアをフェードアウト
});

jQuery(window).on('scroll', function () {
  if (jQuery('header').height() < jQuery(this).scrollTop()) {
    jQuery('.header').addClass('change-color');
  } else {
    jQuery('.header').removeClass('change-color');
  }
});


//=========================スクロールで一画面移動=========================
$.scrollify({
  section : ".box",                          //1ページスクロールさせたいエリアクラス名
  scrollbars:"false",                        //スクロールバー表示・非表示設定
  interstitialSection : "#header,#footer",   //ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
  easing: "swing",                           // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
  scrollSpeed: 800,                          // スクロール時の速度

//以下、ページネーション設定
  before:function(i,panels) {
    var ref = panels[i].attr("data-section-name");
    $(".pagination .active").removeClass("active");
    $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
  },
  afterRender:function() {
    var pagination = "<ul class=\"pagination\">";
    var activeClass = "";
    $(".box").each(function(i) {       //1ページスクロールさせたいエリアクラス名を指定
      activeClass = "";
      if(i===$.scrollify.currentIndex()) {
        activeClass = "active";
      }
      pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
    });
    pagination += "</ul>";

    $("#box1").append(pagination);          //はじめのエリアにページネーションを表示
    $(".pagination a").on("click",$.scrollify.move);
  }

});


//=========================ナビゲーションクリックでの移動=========================
$('#page-link a[href*="#"]').click(function () {          //全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
  var elmHash = $(this).attr('href');                              //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top;	                             //idの上部の距離を取得
  $('body,html').animate({scrollTop: pos}, 500);  //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  return false;
});

//=========================アニメーション=========================
// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

  // ふわっ
  $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
      $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述
