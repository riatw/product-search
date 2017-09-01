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

	function getQuery() {
		var searchArr = location.search.replace("?","").split("&");
		var queryArr = [];

		for ( var i = 0; i < searchArr.length; i++ ) {
			if ( searchArr[i].match(/^code/) ) {
				queryArr.push( decodeURIComponent(searchArr[i].split("=").pop()) )
			}
		}
		return queryArr;
	}

	$.ajax({
		url: "http://192.168.10.178:82/api/?__mode=api",
		dataType: "json"
	}).done(function(data) {
		var testData = data;
		var queryCodes = getQuery();

		testData = testData.filter(function(element) {
			if ( $.inArray( element.code, queryCodes ) != -1 ) {
				return true;
			}
		});

		console.log(queryCodes);

		var app = new Vue ({
			el: '#app',
			data: {
				page: 0,
				dispItemSize: 50,
				qTitle: '',
				qStore: [],
				qMaker: '',
				qSize: [],
				list: testData,
				result: [],
				sizes: [],
				stores: [],
				isActive: false,
				isActive2: false,
				isActive3: false,
				isActive4: false
			},
			methods:{
			},
			computed: {
				filteredView: function() {
					var that = this;
					var filterd = [];
					var targetFields = [
						{ key: "maker", label: "メーカー名"},
						{ key: "code", label: "型式" },
						{ key: "type", label: "種類" },
						{ key: "pixcel", label: "解像度" },
						{ key: "frame", label: "ﾌﾚｰﾑﾚｰﾄ(fps)/ﾗｲﾝﾚｰﾄ(kHz)" },
						{ key: "if", label: "I/F" },
						{ key: "wavelength", label: "波長" },
						{ key: "mount", label: "レンズマウント" },
						{ key: "ccd_cmos", label: "CCD/CMOS" },
						{ key: "sensor", label: "センサーサイズ" },
						{ key: "touse", label: "用途" }
					];

					for ( var i = 0; i < targetFields.length; i++ ) {
						var key = targetFields[i].key;
						var currentRow = {
							key: targetFields[i].key,
							label: targetFields[i].label,
							items: []
						};

						for ( var j = 0; j < that.list.length; j++ ) {
							currentRow.items.push(that.list[j][key])
						}

						filterd.push(currentRow);
					}

					return filterd;
				}
		  }

		})
	});
});
