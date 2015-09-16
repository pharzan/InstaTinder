/**
 * Created by Farzan on 9/15/2015.
 */

mx.storage(mx.DEFAULT_STORAGE_NAME, mx.LOCAL_STORAGE);
var instaStorage = mx.storage('persistent', mx.LOCAL_STORAGE);

console.log(instaStorage.get('user'))

var main = {
    controller: function () {

    },

    view: function () {
        return m.component(instapost)
    }

};


var sidebarRight = {
    vm: {
        likes: m.prop(0),
        dislikes: m.prop(0)

    },
    signInUp: function (user, pass, stat) {

        m.request({
            method: "GET",
            url: "instaSigIn",
            dataType: "text",
            data: {
                user: user,
                password: pass,
                type: stat
            }
        })
            .then(function (response) {

                console.log(response)

                //m.redraw()
            })

    },
    controller: function () {

    },
    view: function () {
        if (instaStorage.get('user')) {
            return m('div.col-md-4', {
                    onclick: function () {
                        console.log('SIDEBAR****')
                    }
                }, [
                    m('div.sidebar', 'Likes:' + sidebarRight.vm.likes()),
                    m('div.sidebar', 'Dislikes:' + sidebarRight.vm.dislikes())

                ]
            )

        }
        else {
            return m('div', [
                m('form.form-horizontal', [
                    m('div.form-group', [
                        m('label.col-sm-2.control-label[for="inputEmail3"]', 'Email'),
                        m('div.col-sm-10', [
                            m('input.form-control#inputEmail[type="email"][placeholder="email@somewhere.com"]')
                        ])

                    ]),
                    m('div.form-group', [
                        m('label.col-sm-2.control-label[for="inputPassword3"]', 'Password '),
                        m('div.col-sm-10', [
                            m('input.form-control#inputPassword[type="password"][placeholder="password"]')
                        ])

                    ]),
                    m('div.form-group', [
                        m('div.col-sm-offset-2.col-sm-4', [
                            m('div.btn.btn-success[type="submit"][name="signIn"][value="signIn"]', {
                                onclick: function () {
                                    var user = document.getElementById('inputEmail').value
                                    var pass = document.getElementById('inputPassword').value
                                    sidebarRight.signInUp(user, pass, 'signin')
                                    console.log('Signin', document.getElementById('inputEmail').value)
                                }
                            }, 'Sign In')
                        ]),
                        m('div.col-sm-offset-2.col-sm-4', [
                            m('div.btn.btn-danger[type="submit"][name="signIn"][value="signIn"]', {
                                onclick: function () {
                                    var user = document.getElementById('inputEmail').value
                                    var pass = document.getElementById('inputPassword').value
                                    sidebarRight.signInUp(user, pass, 'signup')
                                    console.log('SignUp', document.getElementById('inputEmail').value)
                                }
                            }, 'Sign Up')
                        ])

                    ])
                ])

            ])

        }

    }
}
var instapost = {
    vm: {
        post: m.prop([]),
        counter: m.prop(1)
    },
    getimages: function () {

        m.request({
            method: "GET",
            url: "instaquery",
            dataType: "text",
            data: {type: 'selfie'}
        })
            .then(function (response) {
                instapost.vm.post(response)
                //console.log(response)

                m.redraw()
            })

    },
    rate: function (rating) {
        var vm = instapost.vm;

        console.log('rating', rating);
        console.log('current link', vm.post()['links'][vm.counter(vm.counter())])
        console.log('current ##', vm.counter())

        if (vm.counter() < 18) {
            vm.counter(vm.counter() + 1)

        }
        else {
            console.log('going to get images again')
            instapost.getimages();
            vm.counter(0);

        }

    },
    controller: function () {
        instapost.getimages()
    }
    ,

    view: function () {
        var vm = instapost.vm;
        return m('div.row', [


            m("div.col-sm-8.image[style=background:url(" + vm.post()['links'][vm.counter(vm.counter())] + ")]",
                [
                    m('div.row', [
                        m('.div.thumb-left.col-xs-8.col-sm-6.fa.fa-thumbs-o-up.fa-4x.fa-rotate-180', {
                                onclick: function () {
                                    sidebarRight.vm.dislikes(sidebarRight.vm.dislikes() + 1)
                                    instapost.rate('bad')
                                }
                            }
                        ),
                        m('div.thumb-right.col-xs-4.col-sm-6.fa.fa-thumbs-o-up.fa-4x', {
                            onclick: function () {
                                sidebarRight.vm.likes(sidebarRight.vm.likes() + 1)
                                instapost.rate('good');

                            }
                        }),
                        m("div.")
                    ])

                ]
            ),

        ])

    }
}

m.route.mode = "hash";

m.route(document.getElementById('instatinder'), "/instatinder", {
    "/instatinder": main
});
m.mount(document.getElementById('sidebar'), sidebarRight)


