/*! For license information please see module.js.LICENSE.txt */
define(["react","@grafana/ui","@grafana/data","lodash","@grafana/runtime"],(function(e,t,n,r,a){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=5)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=a},function(e,t,n){"use strict";n.r(t);var r=n(2),a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function i(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function l(e,t,n,r){return new(n||(n=Promise))((function(a,i){function o(e){try{s(r.next(e))}catch(e){i(e)}}function l(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,l)}s((r=r.apply(e,t||[])).next())}))}function s(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}function u(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}var c=n(3),m=n(4),p=function(e){function t(t){var n=e.call(this,t)||this;return n.organization=t.jsonData.organization,n.user_id=t.jsonData.user_id,n.url=t.url,n.baseBillAnalysisUrl="/bill-analysis/orgs/"+n.organization+"/costs",n.baseAnalyticsUrl="/analytics/users/"+n.user_id+"/orgs/"+n.organization,n}return i(t,e),t.prototype.query=function(e){return l(this,void 0,Promise,(function(){var t,n=this;return s(this,(function(r){return t=e.targets.map((function(t){var r=n.getStartTimestamp(e,t.granularity),a=n.getEndTimestamp(e,t.granularity);n.validateQueryRequest(t,r,a);var i=n.generateRequestPayload(e,t,r,a),o={method:"POST",url:n.url+n.baseBillAnalysisUrl+"/aggregated",data:i},l=n.getFiniteNumber(t.valueFilter),s=n.getFiniteNumber(t.groupsToShow);return s<=0&&(s=1e3),n.doFlexeraRequest(o).then((function(e){var r=n.parseRequestResponse(e,l,t.dimensionGroupBy);return n.aggregateResponseData(r,s,t.refId)}))})),[2,Promise.all(t).then((function(e){return{data:Object(c.flatten)(e)}}))]}))}))},t.prototype.doFlexeraRequest=function(e){return l(this,void 0,void 0,(function(){return s(this,(function(t){return[2,Object(m.getBackendSrv)().datasourceRequest(e)]}))}))},t.prototype.generateRequestPayload=function(e,t,n,r){var a='{"granularity":"'+t.granularity+'","start_at":"'+this.getStartTimestamp(e,t.granularity)+'","end_at":"'+this.getEndTimestamp(e,t.granularity)+'","dimensions":["'+t.dimensionGroupBy+'"],"billing_center_ids":["'+(void 0!==t.billingCenterIDs?t.billingCenterIDs.join('","'):"")+'"],"metrics":["cost_amortized_unblended_adj"],"filter":';return void 0!==t.dimensionFilter?a+='{"dimension": "'+t.dimensionFilter+'", "type": "'+t.dimensionFilterOperator+'", "'+("substring"===t.dimensionFilterOperator?"substring":"value")+'": "'+t.dimensionFilterValue+'"}':a+="null",a+="}"},t.prototype.parseRequestResponse=function(e,t,n){var r=[];return e.data.rows.forEach((function(e){if(e.metrics.cost_amortized_unblended_adj>=t){var a=e.dimensions[n];""===a&&(a="No Value"),void 0===r.find((function(t){if(t.dimension===a)return t.summedValue+=e.metrics.cost_amortized_unblended_adj,t.values.push({timestamp:e.timestamp,metric:e.metrics.cost_amortized_unblended_adj}),t}))&&r.push({dimension:a,summedValue:e.metrics.cost_amortized_unblended_adj,values:[{timestamp:e.timestamp,metric:e.metrics.cost_amortized_unblended_adj}]})}})),r},t.prototype.aggregateResponseData=function(e,t,n){var a,i,o,l,s,c,m=[];e=e.sort((function(e,t){return t.summedValue-e.summedValue}));var p=0,d=new Map;try{for(var h=u(e),f=h.next();!f.done;f=h.next()){var v=f.value;if(++p<t){var g=new r.MutableDataFrame({refId:n,name:v.dimension,fields:[{name:"Time",type:r.FieldType.time},{name:"Value",type:r.FieldType.number}]});try{for(var y=(o=void 0,u(v.values)),b=y.next();!b.done;b=y.next()){var w=b.value;g.appendRow([new Date(w.timestamp),w.metric])}}catch(e){o={error:e}}finally{try{b&&!b.done&&(l=y.return)&&l.call(y)}finally{if(o)throw o.error}}m.push(g)}else try{for(var F=(s=void 0,u(v.values)),D=F.next();!D.done;D=F.next()){w=D.value;var E=0;d.has(w.timestamp)&&(E=d.get(w.timestamp)),E+=w.metric,d.set(w.timestamp,E)}}catch(e){s={error:e}}finally{try{D&&!D.done&&(c=F.return)&&c.call(F)}finally{if(s)throw s.error}}}}catch(e){a={error:e}}finally{try{f&&!f.done&&(i=h.return)&&i.call(h)}finally{if(a)throw a.error}}if(d.size>0){var C=new r.MutableDataFrame({refId:n,name:"Other",fields:[{name:"Time",type:r.FieldType.time},{name:"Value",type:r.FieldType.number}]});d.forEach((function(e,t){C.appendRow([new Date(t),e])})),C.fields[0].values.length>0&&m.push(C)}return m},t.prototype.testDatasource=function(){return l(this,void 0,void 0,(function(){var e=this;return s(this,(function(t){return[2,new Promise((function(t,n){return l(e,void 0,void 0,(function(){var e;return s(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.getDimensions()];case 1:return(e=r.sent())&&e.length>0?t({message:"Successfully connected to Flexera API.",status:"success"}):n({message:"Failed to connect.",status:"error"}),[3,3];case 2:return r.sent(),n({message:"Failed to Connect.",status:"error"}),[3,3];case 3:return[2]}}))}))}))]}))}))},t.prototype.getDimensions=function(){return l(this,void 0,Promise,(function(){var e;return s(this,(function(t){return e={method:"GET",url:this.url+this.baseBillAnalysisUrl+"/dimensions"},[2,this.doFlexeraRequest(e).then((function(e){var t=[{id:"",name:"",type:""}];return e.data.dimensions.forEach((function(e){var n={id:e.id,name:e.name,type:e.type};t.push(n)})),t.sort((function(e,t){return e.name>t.name?1:-1})),t})).then((function(e){return e}))]}))}))},t.prototype.getBillingCenters=function(){return l(this,void 0,Promise,(function(){var e;return s(this,(function(t){return e={method:"GET",url:this.url+this.baseAnalyticsUrl+"/billing_centers"},[2,this.doFlexeraRequest(e).then((function(e){var t=[];return e.data.forEach((function(e){var n={id:e.id,name:e.name,kind:e.kind};t.push(n)})),t.sort((function(e,t){return e.name>t.name?1:-1})),t})).then((function(e){return e}))]}))}))},t.prototype.getStartTimestamp=function(e,t){var n=e.range.from.toDate();return this.getTimestampString(n,t)},t.prototype.getEndTimestamp=function(e,t){var n=e.range.to.toDate();return this.getTimestampString(n,t)},t.prototype.getTimestampString=function(e,t){var n=e.getFullYear()+"-",r=e.getMonth()+1;if(r<10&&(n+="0"),n+=r.toString(),"day"===t){n+="-";var a=e.getDate();a<10&&(n+="0"),n+=a.toString()}return n},t.prototype.validateQueryRequest=function(e,t,n){if(void 0===e.dimensionGroupBy)throw new Error("Group By Dimension must be selected.");if(void 0===e.billingCenterIDs||0===e.billingCenterIDs.length)throw new Error("At least one Billing Center must be selected.");if(void 0===e.granularity)throw new Error("Granularity must be selected.");if(t===n)throw new Error("Time range needs to be adjusted. For a granularity of "+("month"===e.granularity?"Monthly ":"Daily ")+"the range must span at least one "+e.granularity+".");if(void 0!==e.dimensionFilter&&(void 0===e.dimensionFilterOperator||void 0===e.dimensionFilterValue))throw new Error("If a Dimension Filter value is selected, an operator and value must also be selected.");if(void 0!==e.dimensionFilterOperator&&(void 0===e.dimensionFilter||void 0===e.dimensionFilterValue))throw new Error("If a Dimension Filter operator value is selected, a dimension and value must also be selected.");if(void 0!==e.dimensionFilterValue&&(void 0===e.dimensionFilter||void 0===e.dimensionFilterOperator))throw new Error("If a Dimension Filter value is selected, a dimension and operator must also be selected.");if(void 0!==e.valueFilter&&-1===this.getFiniteNumber(e.valueFilter))throw new Error("The Minimum Cost value must be a positive integer value.");if(void 0!==e.groupsToShow&&-1===this.getFiniteNumber(e.groupsToShow))throw new Error("The Number of Groups to Show value must be a positive integer value.")},t.prototype.getFiniteNumber=function(e){var t=-1,n=Number(e);return isFinite(n)&&n>=0&&(t=n),t},t}(r.DataSourceApi),d=n(0),h=n.n(d),f=n(1),v=f.LegacyForms.Input,g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.prototype.render=function(){var e,t=this.props.options;return h.a.createElement(h.a.Fragment,null,h.a.createElement("h3",{className:"page-heading"},"Flexera API Details"),h.a.createElement("div",{className:"gf-form-group"},h.a.createElement("div",{className:"gf-form-inline"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Account ID"),h.a.createElement("div",{className:"width-15"},h.a.createElement(v,{className:"width-30",placeholder:"#####",value:t.jsonData.account||"",onChange:Object(r.onUpdateDatasourceJsonDataOption)(this.props,"account")})))),h.a.createElement("div",{className:"gf-form-inline"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Organization ID"),h.a.createElement("div",{className:"width-15"},h.a.createElement(v,{className:"width-30",placeholder:"#####",value:t.jsonData.organization||"",onChange:Object(r.onUpdateDatasourceJsonDataOption)(this.props,"organization")})))),h.a.createElement("div",{className:"gf-form-inline"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(f.InlineFormLabel,{className:"width-12"},"User ID"),h.a.createElement("div",{className:"width-15"},h.a.createElement(v,{className:"width-30",placeholder:"#####",value:t.jsonData.user_id||"",onChange:Object(r.onUpdateDatasourceJsonDataOption)(this.props,"user_id")})))),h.a.createElement("div",{className:"gf-form-inline"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(f.InlineFormLabel,{className:"width-12"},"API Endpoint"),h.a.createElement("div",{className:"width-15"},h.a.createElement(v,{className:"width-30",placeholder:"us-#.rightscale.com",value:t.jsonData.api_endpoint||"",onChange:Object(r.onUpdateDatasourceJsonDataOption)(this.props,"api_endpoint")})))),h.a.createElement("div",{className:"gf-form-inline"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Refresh Token"),h.a.createElement("div",{className:"width-15"},h.a.createElement(v,{className:"width-30",placeholder:"",value:(null===(e=t.secureJsonData)||void 0===e?void 0:e.refresh_token)||"",onChange:Object(r.onUpdateDatasourceSecureJsonDataOption)(this.props,"refresh_token")}))))))},t}(d.PureComponent),y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={availableDimensions:[],availableBillingCenters:[],currentDimensionGroup:t.props.query.dimensionGroupBy,currentDimensionFilter:t.props.query.dimensionFilter,currentDimensionOperator:t.props.query.dimensionFilterOperator,currentDimensionValue:t.props.query.dimensionFilterValue,currentGranularity:t.props.query.granularity,currentBillingCenters:[],currentFilter:t.props.query.valueFilter,currentGroupsToShow:t.props.query.groupsToShow},t.onDimensionGroupByChange=function(e){t.state.currentDimensionGroup=e.value,t.props.onChange(o(o({},t.props.query),{dimensionGroupBy:e.value}))},t.onDimensionFilterChange=function(e){t.state.currentDimensionFilter=e.value,t.props.onChange(o(o({},t.props.query),{dimensionFilter:e.value}))},t.onDimensionFilterOperatorChange=function(e){t.state.currentDimensionOperator=e.value,t.props.onChange(o(o({},t.props.query),{dimensionFilterOperator:e.value}))},t.onDimensionFilterValueChange=function(e){t.state.currentDimensionValue=e.target.value,t.props.onChange(o(o({},t.props.query),{dimensionFilterValue:e.target.value}))},t.onGranularityChange=function(e){t.state.currentGranularity=e.value,t.props.onChange(o(o({},t.props.query),{granularity:e.value}))},t.onBillingCenterChange=function(e){var n;t.state.currentBillingCenters=e,t.props.onChange(o(o({},t.props.query),{billingCenterIDs:null!==(n=null==e?void 0:e.map((function(e){return e.value})))&&void 0!==n?n:[]}))},t.onFilterChange=function(e){t.state.currentFilter=e.target.value,t.props.onChange(o(o({},t.props.query),{valueFilter:e.target.value}))},t.onGroupsToShowChange=function(e){t.state.currentGroupsToShow=e.target.value,t.props.onChange(o(o({},t.props.query),{groupsToShow:e.target.value}))},t}return i(t,e),t.prototype.componentDidMount=function(){return l(this,void 0,void 0,(function(){var e,t,n,r;return s(this,(function(a){switch(a.label){case 0:return[4,(e=this.props.datasource).getDimensions()];case 1:return t=a.sent(),[4,e.getBillingCenters()];case 2:return n=a.sent(),r=[],void 0!==this.props.query.billingCenterIDs&&this.props.query.billingCenterIDs.forEach((function(e){var t={value:e};r.push(t)})),this.setState({availableDimensions:t,availableBillingCenters:n,currentBillingCenters:r}),[2]}}))}))},t.prototype.render=function(){var e=this,t=this.state.availableDimensions.map((function(e){return{label:e.name,value:e.id}})),n=this.state.availableBillingCenters.map((function(e){return{label:e.name,value:e.id}})),r=this.state,a=r.currentBillingCenters,i=r.currentDimensionGroup,o=r.currentDimensionFilter,l=r.currentDimensionOperator,s=r.currentDimensionValue,u=r.currentGranularity,c=r.currentFilter,m=r.currentGroupsToShow;return h.a.createElement("div",null,h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Group By Dimension"),h.a.createElement(f.Select,{className:"width-15",placeholder:"Choose Dimension",isSearchable:!0,options:t,value:i,onChange:this.onDimensionGroupByChange})),h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Billing Centers"),h.a.createElement(f.MultiSelect,{className:"width-15",placeholder:"Choose Billing Centers",options:n,value:a,onChange:function(t){e.onBillingCenterChange(t)}})),h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Granularity"),h.a.createElement(f.Select,{className:"width-15",placeholder:"Choose Granularity",isSearchable:!0,options:[{label:"",value:""},{label:"Daily",value:"day"},{label:"Monthly",value:"month"}],value:u,onChange:this.onGranularityChange})),h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Dimension Filter"),h.a.createElement(f.Select,{className:"width-15",placeholder:"Choose Dimension",isSearchable:!0,options:t,value:o,onChange:this.onDimensionFilterChange}),h.a.createElement(f.Select,{className:"width-15",placeholder:"Choose Operator",isSearchable:!0,options:[{label:"",value:""},{label:"Equal To",value:"equal"},{label:"Not Equal To",value:"not"},{label:"Contains",value:"substring"}],value:l,onChange:this.onDimensionFilterOperatorChange}),h.a.createElement(f.Input,{className:"width-15",placeholder:"Dimension Value",onChange:this.onDimensionFilterValueChange,css:"css",value:s})),h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Minimum Cost"),h.a.createElement(f.Input,{className:"width-15",placeholder:"Minimum Cost to Display",onChange:this.onFilterChange,css:"css",value:c})),h.a.createElement(f.InlineFieldRow,null,h.a.createElement(f.InlineFormLabel,{className:"width-12"},"Number of Groups to Show"),h.a.createElement(f.Input,{className:"width-15",placeholder:"10",onChange:this.onGroupsToShowChange,css:"css",value:m})))},t}(d.PureComponent);n.d(t,"plugin",(function(){return b}));var b=new r.DataSourcePlugin(p).setConfigEditor(g).setQueryEditor(y)}])}));
//# sourceMappingURL=module.js.map