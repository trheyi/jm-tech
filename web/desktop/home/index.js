import ImageEditor from '../components/editor/image'; // 下一版应该可以自动引用组件

let web = getWeb()

Page({
      data: {},
      imageEditor: null,
      onReady: function (param) {
            const _that = this

            _that.setTarget(_that.data.target)

            // 载入图片编辑器
            try {

                  ImageEditor.$load({
                        selector: 'editor[type=image]'
                  });
                  this.imageEditor = ImageEditor.options;

            } catch (e) {
                  console.log('Error @ImageEditor', e);
            }

            // Tab 切换
            $('.jm-tabs li>a').click(function (event) {

                  // 设定为Loading提示
                  $('#forms .loading').removeClass('uk-hidden');
                  $('#forms .loaded').addClass('uk-hidden');

                  let link = $(this).attr('href');
                  let html = '<iframe width="100%" height="100%" src="' + link + '" frameborder="0"  scrolling="no"></iframe>';
                  $('#forms .iframe').html(html);
                  $('#forms .loaded').removeClass('uk-hidden'); // 打开Page

                  $('#forms iframe').load(function (event) {
                        let frameH = $(this).contents().find("body").height();
                        $(this).attr('height', frameH);
                        $(this).css('height', frameH);
                        $('#forms .loading').addClass('uk-hidden');


                        // 更新Location
                        var stateObj = {
                              home: "index"
                        };
                        var links = link.split('/');
                        var form = links.pop();
                        let uri = window.location.href.split('#');
                        let url = uri[0] + '#' + form;
                        var title = $(this).contents().find("title").html();
                        $('title').html(title);
                        window.history.pushState(stateObj, title, url);
                  });


            });

            // 激活当前页
            let uri = window.location.href.split('#');
            let form = uri[1] || 'profile';
            let link = '/home/forms/' + form;
            $('.jm-tabs li').removeClass('uk-active');
            $('.jm-tabs a[href=\'' + link + '\']').parent().addClass('uk-active');
            $('.jm-tabs a[href=\'' + link + '\']').trigger('click');
      },
      setTarget: function (target) {
            sessionStorage.setItem('target', target)
      }
})