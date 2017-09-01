$(function () {
	$.addIcon();
	$.rollover();
	$.smoothScroll();

	function unique(arr) {
		arr = arr.filter(function(element, index, array) {
			return array.indexOf(element) === index;
		});

		return arr;
	}

	$.ajax({
		url: "http://192.168.10.178:82/api/?__mode=api",
		dataType: "json"
	}).done(function(data) {
		var testData = data;

		var app = new Vue ({
			el: '#app',
			data: {
				page: 0,
				dispItemSize: 50,
				qCode: '',
				qMaker: [],
				qColor: [],
				list: testData,
				result: [],
				colors: [],
				makers: [],
				isActive: false,
				isActive2: false,
				isActive3: false,
				isActive4: false
			},
			methods:{
				showFirst: function() {
					this.page = 0;
				},
				showPrev: function() {
					if (this.isStartPage) return;
					this.page--;
				},
				showNext: function() {
					if (this.isEndPage) return;
					this.page++;
				},
				showLast: function() {
					this.page = Math.floor((this.result.length - 1) / this.dispItemSize);
				},
				showPage: function(index) {
					this.page = index;
				},
				getCurrent: function(index) {
					if ( this.page == index ) {
						return true;
					}
				},
				clearForm: function() {
					this.qCode = "";
					this.qMaker = [];
					this.qMaker = "";
					this.qColor = [];
				},
				openContent: function(target) {
				}
			},
			computed: {
				isStartPage: function(){
					return (this.page == 0);
				},
				isEndPage: function(){
					return ((this.page + 1) * this.dispItemSize >= this.result.length);
				},
				pageCount: function() {
					return Math.ceil(this.result.length / this.dispItemSize);
				},
				filteredView: function() {
					var that = this;
					var filterd = this.list;

					if ( that.qCode ) {
						filterd = filterd.filter(function(element) {
							if ( element.code.indexOf(that.qCode) != -1 ) {
								return true;
							}
						});
					}

					if ( that.qMaker.length > 0 ) {
						filterd = filterd.filter(function(element) {
							if ( $.inArray( element.maker, that.qMaker ) != -1 ) {
								return true;
							}
						});
					}

					if ( that.qColor.length > 0 ) {
						filterd = filterd.filter(function(element) {
							if ( $.inArray( element.color, that.qColor ) != -1 ) {
								return true;
							}
						});
					}

					filterd.filter(function(element) {
						var makers = [];
						var colors = [];

						filterd.filter(function(element) {
							makers.push( element.maker );
							colors.push( element.color );
						});

						makers = unique(makers).sort();
						colors = unique(colors).sort();

						that.makers = makers;
						that.colors = colors;
					});

					this.result = filterd;

					var startPage = this.page * this.dispItemSize;
					filterd = filterd.slice(startPage, startPage + this.dispItemSize);

					return filterd;
				}
		  }

		})
	});
});
