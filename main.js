(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js":
/*!***********************************************************!*\
  !*** ./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js ***!
  \***********************************************************/
/*! exports provided: NgxRowAccordionComponent, NgxRowAccordionModule, NgxRowAccordionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionComponent", function() { return NgxRowAccordionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionModule", function() { return NgxRowAccordionModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxRowAccordionService", function() { return NgxRowAccordionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxRowAccordionService = /** @class */ (function () {
    function NgxRowAccordionService() {
        this.groups$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.componentToGroup = new Map();
    }
    /**
     * @param {?} accordionComponentId
     * @param {?} groupName
     * @param {?=} collapsePrevious
     * @return {?}
     */
    NgxRowAccordionService.prototype.addComponentToGroup = /**
     * @param {?} accordionComponentId
     * @param {?} groupName
     * @param {?=} collapsePrevious
     * @return {?}
     */
    function (accordionComponentId, groupName, collapsePrevious) {
        var _a, _b;
        if (collapsePrevious === void 0) { collapsePrevious = true; }
        // get current group
        /** @type {?} */
        var groups = this.groups$.getValue();
        /** @type {?} */
        var group = groups[groupName];
        // if the group does not exist yet, initialize it
        if (!group) {
            group = {
                map: {},
                array: [],
            };
        }
        // if the accordion ID is already registered, throw
        if (!!group.map[accordionComponentId]) {
            throw new Error('A row-accordion should be registered only once');
        }
        // add the new accordion to the group
        /** @type {?} */
        var groupWithNewAccordion = {
            map: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, group.map, (_a = {}, _a[accordionComponentId] = { folded: false, collapsePrevious: collapsePrevious }, _a)),
            array: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(group.array, [accordionComponentId]),
        };
        this.componentToGroup.set(accordionComponentId, groupName);
        /** @type {?} */
        var index = groupWithNewAccordion.array.length - 1;
        /** @type {?} */
        var newGroupWithNewState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.groups$.getValue(), (_b = {}, _b[groupName] = groupWithNewAccordion, _b));
        // if adding an accordion which is not the first one, close the previous one
        if (index > 0) {
            /** @type {?} */
            var previousComponentId = groupWithNewAccordion.array[index - 1];
            /** @type {?} */
            var closePrevious = newGroupWithNewState[groupName].map[previousComponentId].collapsePrevious;
            newGroupWithNewState = getNewState(newGroupWithNewState, groupName, previousComponentId, {
                folded: closePrevious,
            });
        }
        this.groups$.next(newGroupWithNewState);
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.removeComponentFromGroup = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        var _a;
        /** @type {?} */
        var groups = this.groups$.getValue();
        /** @type {?} */
        var groupName = this.componentToGroup.get(accordionComponentId);
        if (!groupName) {
            return;
        }
        /** @type {?} */
        var group = this.groups$.getValue()[groupName];
        var _b = group.map, _c = accordionComponentId, omit = _b[_c], newMap = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_b, [typeof _c === "symbol" ? _c : _c + ""]);
        /** @type {?} */
        var newArray = group.array.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x !== accordionComponentId; }));
        /** @type {?} */
        var newGroups;
        var _d = groupName, currentGroup = groups[_d], remainingGroups = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(groups, [typeof _d === "symbol" ? _d : _d + ""]);
        if (newArray.length === 0) {
            // if current group is now empty, remove the group by keeping only the others
            newGroups = remainingGroups;
        }
        else {
            /** @type {?} */
            var indexCompToRemove = group.array.findIndex((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return id === accordionComponentId; }));
            /** @type {?} */
            var idPreviousComp = group.array[indexCompToRemove - 1];
            /** @type {?} */
            var newGroupsBeforeUnfoldingPrevious = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, remainingGroups, (_a = {}, _a[groupName] = {
                map: newMap,
                array: newArray,
            }, _a));
            newGroups = getNewState(newGroupsBeforeUnfoldingPrevious, groupName, idPreviousComp, { folded: false });
        }
        this.groups$.next(newGroups);
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.getState = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        /** @type {?} */
        var groupName = this.componentToGroup.get(accordionComponentId);
        return this.groups$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} groups
         * @return {?}
         */
        function (groups) { return groups[groupName]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return !!group; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.map[accordionComponentId]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return !!group; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(0));
    };
    /**
     * @private
     * @param {?} accordionComponentId
     * @param {?} newState
     * @return {?}
     */
    NgxRowAccordionService.prototype.updateState = /**
     * @private
     * @param {?} accordionComponentId
     * @param {?} newState
     * @return {?}
     */
    function (accordionComponentId, newState) {
        /** @type {?} */
        var groupName = this.componentToGroup.get(accordionComponentId);
        /** @type {?} */
        var state = this._getState(accordionComponentId);
        if (!!state) {
            this.groups$.next(getNewState(this.groups$.getValue(), groupName, accordionComponentId, newState));
        }
    };
    /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype.toggle = /**
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        /** @type {?} */
        var groupName = this.componentToGroup.get(accordionComponentId);
        /** @type {?} */
        var state = this._getState(accordionComponentId);
        if (!!state) {
            /** @type {?} */
            var folded = state.folded;
            this.updateState(accordionComponentId, { folded: !folded });
        }
    };
    /**
     * @private
     * @param {?} accordionComponentId
     * @return {?}
     */
    NgxRowAccordionService.prototype._getState = /**
     * @private
     * @param {?} accordionComponentId
     * @return {?}
     */
    function (accordionComponentId) {
        /** @type {?} */
        var groupName = this.componentToGroup.get(accordionComponentId);
        /** @type {?} */
        var groups = this.groups$.getValue();
        /** @type {?} */
        var group = groups[groupName];
        if (!!group) {
            /** @type {?} */
            var state = group.map[accordionComponentId];
            return state;
        }
    };
    NgxRowAccordionService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgxRowAccordionService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function NgxRowAccordionService_Factory() { return new NgxRowAccordionService(); }, token: NgxRowAccordionService, providedIn: "root" });
    return NgxRowAccordionService;
}());
/**
 * @param {?} groups
 * @param {?} groupName
 * @param {?} accordionComponentId
 * @param {?} newState
 * @return {?}
 */
function getNewState(groups, groupName, accordionComponentId, newState) {
    var _a, _b;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups, (_a = {}, _a[groupName] = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName], { map: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName].map, (_b = {}, _b[accordionComponentId] = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, groups[groupName].map[accordionComponentId], newState), _b)) }), _a));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxRowAccordionComponent = /** @class */ (function () {
    function NgxRowAccordionComponent(ngxRowAccordionService) {
        this.ngxRowAccordionService = ngxRowAccordionService;
        this.collapsePrevious = true;
        this.id = Object(uuid__WEBPACK_IMPORTED_MODULE_4__["v4"])();
        this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.group) {
            throw new Error('[ngx-row-accordion] you should always pass a group when creating a row-accordion');
        }
        this.ngxRowAccordionService.addComponentToGroup(this.id, this.group, this.collapsePrevious);
        this.isPanelOpen$ = this.ngxRowAccordionService.getState(this.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x.folded; })));
    };
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy$.complete();
        this.ngxRowAccordionService.removeComponentFromGroup(this.id);
    };
    /**
     * @return {?}
     */
    NgxRowAccordionComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.ngxRowAccordionService.toggle(this.id);
    };
    NgxRowAccordionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ngx-row-accordion',
                    template: "<div class=\"ngx-row-accordion-container\">\n  <div class=\"ngx-row-accordion level-one\">\n    <div class=\"ngx-row-accordion level-two\">\n      <div class=\"title\" (click)=\"toggle()\" [ngClass]=\"(isPanelOpen$ | async) ? 'close-panel' : 'open-panel'\">\n        {{ title }}\n      </div>\n\n      <div class=\"body\" [hidden]=\"!(isPanelOpen$ | async)\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n\n  <router-outlet></router-outlet>\n</div>\n",
                    styles: [".ngx-row-accordion-container{display:-webkit-box;display:flex;height:100%}.ngx-row-accordion:first-of-type{display:-webkit-box;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    NgxRowAccordionComponent.ctorParameters = function () { return [
        { type: NgxRowAccordionService }
    ]; };
    NgxRowAccordionComponent.propDecorators = {
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        collapsePrevious: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgxRowAccordionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @todo RouterModule should be passed within forRoot to avoid creating new instances
// this will prevent unexpected behavior with interceptors on main app
var NgxRowAccordionModule = /** @class */ (function () {
    function NgxRowAccordionModule() {
    }
    /**
     * @return {?}
     */
    NgxRowAccordionModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxRowAccordionModule,
            providers: [NgxRowAccordionService],
        };
    };
    NgxRowAccordionModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"]],
                    declarations: [NgxRowAccordionComponent],
                    exports: [NgxRowAccordionComponent],
                },] }
    ];
    return NgxRowAccordionModule;
}());


//# sourceMappingURL=ngx-row-accordion.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/accordions-page/accordions-page.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/accordions-page/accordions-page.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"accordions-container\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-one/page-one.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/accordions-page/page-one/page-one.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 1 title\" group=\"great-accordions-group\">\n  Page 1 content\n\n  <p>\n    <a routerLink=\"page2\">Open page 2</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod esse.\n  Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum eu officia\n  aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit\n  exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident\n  aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud\n  labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip\n  incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur\n  sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit\n  quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet.\n  Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod\n  et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure.\n  Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat\n  magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod\n  esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum\n  eu officia aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt\n  laborum sit exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute.\n  Proident aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore\n  id nostrud labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex\n  fugiat. Aliquip incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum\n  consectetur sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat\n  nostrud. Sit quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna\n  mollit amet. Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur\n  eiusmod et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris\n  irure. Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo.\n  Cupidatat magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat\n  pariatur eiusmod esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute\n  ullamco laborum eu officia aute laboris.\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-three/page-three.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/accordions-page/page-three/page-three.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 3 title\" group=\"great-accordions-group\">\n  Page 3 content\n\n  <p>\n    <a routerLink=\"page4\">Open page 4</a>\n  </p>\n\n  <p>\n    <a routerLink=\"/app/accordions/page1/page2\">Come back to page 2</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-two/page-two.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/accordions-page/page-two/page-two.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 2 title\" group=\"great-accordions-group\">\n    Page 2 content\n\n    <p>\n      <a routerLink=\"page3\">Open page 3</a>\n    </p>\n\n    <p>\n      <a routerLink=\"/app/accordions/page1\">Come back to page 1</a>\n    </p>\n\n    Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n    Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n    esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n    culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n    labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n    duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n    occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n    velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n    Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n    anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  </ngx-row-accordion>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"level-one\">\n  <div class=\"level-two\">\n    <h1>Main route</h1>\n    <button routerLink=\"app/accordions/page1\" type=\"button\" data-go-to-page-1-primary>\n      Go to first primary outlet\n    </button>\n\n    <button routerLink=\"app/accordions\" type=\"button\" data-close-all-primary>\n      Close all (primary outlet)\n    </button>\n  </div>\n\n  <div class=\"level-two\">\n    <h1>Aux route</h1>\n    <button [routerLink]=\"[{outlets: {'aux': ['auxiliary-route', 'accordions', 'page4']}}]\" type=\"button\" data-go-to-page-4-aux>\n      Go to first auxiliary outlet\n    </button>\n\n    <button [routerLink]=\"[{outlets: {'aux': null}}]\" data-close-all-aux>\n      Close all (auxiliary outlet)\n    </button>\n  </div>\n</div>\n\n<div class=\"level-one\">\n  <div class=\"level-two\">\n    <router-outlet></router-outlet>\n  </div>\n\n  <div class=\"level-two\">\n    <router-outlet name=\"aux\"></router-outlet>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/aux-accordions-page.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/aux-accordions-page/aux-accordions-page.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-five/page-five.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/aux-accordions-page/page-five/page-five.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 5 title\" group=\"awesome-accordions-group\">\n  Page 5 content\n\n  <p>\n    <a routerLink=\"page6\">Open page 6</a>\n  </p>\n\n  <p>\n    <a routerLink=\"..\">Come back to page 4</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n</ngx-row-accordion>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-four/page-four.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/aux-accordions-page/page-four/page-four.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 4 title\" group=\"awesome-accordions-group\">\n  Page 4 content\n\n  <p>\n    <a routerLink=\"page5\">Open page 5</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n  duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit quis eu ad ipsum aute\n  occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet. Ullamco ipsum id\n  velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod et magna commodo.\n  Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure. Deserunt quis\n  anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat magna fugiat\n  sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod esse.\n  Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum eu officia\n  aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit\n  exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident\n  aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud\n  labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip\n  incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur\n  sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat nostrud. Sit\n  quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna mollit amet.\n  Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur eiusmod\n  et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris irure.\n  Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo. Cupidatat\n  magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat pariatur eiusmod\n  esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute ullamco laborum\n  eu officia aute laboris. Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt\n  laborum sit exercitation dolore. Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute.\n  Proident aliquip Lorem ad qui esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore\n  id nostrud labore labore. Excepteur culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex\n  fugiat. Aliquip incididunt dolor eiusmod labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum\n  consectetur sint enim ex nulla. Et duis dolor excepteur qui fugiat labore et officia amet reprehenderit aliquip fugiat\n  nostrud. Sit quis eu ad ipsum aute occaecat. Exercitation ad aliqua sunt ut voluptate eiusmod anim. Est do incididunt magna\n  mollit amet. Ullamco ipsum id velit duis officia enim pariatur commodo ullamco duis sit occaecat ad amet. Magna nulla excepteur\n  eiusmod et magna commodo. Laborum culpa minim velit tempor consectetur reprehenderit nulla ullamco adipisicing amet laboris\n  irure. Deserunt quis anim minim enim dolore minim esse amet. Ex voluptate tempor officia commodo aute velit dolor commodo.\n  Cupidatat magna fugiat sint non sit enim minim ut ullamco elit occaecat ipsum. Anim adipisicing qui id duis. Ea fugiat\n  pariatur eiusmod esse. Labore nisi cillum exercitation cupidatat adipisicing aute adipisicing. Ut laborum pariatur aute\n  ullamco laborum eu officia aute laboris.\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-six/page-six.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/aux-accordions-page/page-six/page-six.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-row-accordion title=\"Page 6 title\" group=\"awesome-accordions-group\">\n  Page 6 content\n\n  <p>\n    <a routerLink=\"..\">Come back to page 5</a>\n  </p>\n\n  Pariatur nisi consequat exercitation enim aliqua in labore ullamco nisi ad aliqua. Incididunt laborum sit exercitation dolore.\n  Incididunt occaecat fugiat veniam duis occaecat dolore esse. Do quis est nisi nulla aute. Proident aliquip Lorem ad qui\n  esse aliqua consequat aliqua dolor eu esse sint incididunt est. Lorem veniam nostrud dolore id nostrud labore labore. Excepteur\n  culpa nisi sit eiusmod officia deserunt officia incididunt velit aute sint cillum ex fugiat. Aliquip incididunt dolor eiusmod\n  labore do ea aute mollit voluptate laborum. In aliquip labore eu incididunt. Cillum consectetur sint enim ex nulla. Et\n</ngx-row-accordion>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/accordions-page/accordions-page.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".accordions-container {\n  height: 800px;\n}\n.accordions-container ngx-row-accordion {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9tYXhpbWUxOTkyL25neC1yb3ctYWNjb3JkaW9uL3NyYy9hcHAvYWNjb3JkaW9ucy1wYWdlL2FjY29yZGlvbnMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYWNjb3JkaW9ucy1wYWdlL2FjY29yZGlvbnMtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjtBRENFO0VBQ0UsWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWNjb3JkaW9ucy1wYWdlL2FjY29yZGlvbnMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY2NvcmRpb25zLWNvbnRhaW5lciB7XG4gIGhlaWdodDogODAwcHg7XG5cbiAgbmd4LXJvdy1hY2NvcmRpb24ge1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxufVxuIiwiLmFjY29yZGlvbnMtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiA4MDBweDtcbn1cbi5hY2NvcmRpb25zLWNvbnRhaW5lciBuZ3gtcm93LWFjY29yZGlvbiB7XG4gIGhlaWdodDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/accordions-page/accordions-page.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.component.ts ***!
  \**************************************************************/
/*! exports provided: AccordionsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionsPageComponent", function() { return AccordionsPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccordionsPageComponent = /** @class */ (function () {
    function AccordionsPageComponent() {
    }
    AccordionsPageComponent.prototype.ngOnInit = function () { };
    AccordionsPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-accordions-page',
            template: __webpack_require__(/*! raw-loader!./accordions-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/accordions-page/accordions-page.component.html"),
            styles: [__webpack_require__(/*! ./accordions-page.component.scss */ "./src/app/accordions-page/accordions-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AccordionsPageComponent);
    return AccordionsPageComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/accordions-page.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/accordions-page/accordions-page.module.ts ***!
  \***********************************************************/
/*! exports provided: AccordionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccordionsPageModule", function() { return AccordionsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-row-accordion */ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js");
/* harmony import */ var _accordions_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordions-page.component */ "./src/app/accordions-page/accordions-page.component.ts");
/* harmony import */ var _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-one/page-one.component */ "./src/app/accordions-page/page-one/page-one.component.ts");
/* harmony import */ var _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-three/page-three.component */ "./src/app/accordions-page/page-three/page-three.component.ts");
/* harmony import */ var _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-two/page-two.component */ "./src/app/accordions-page/page-two/page-two.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'accordions',
        component: _accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AccordionsPageComponent"],
        children: [
            {
                path: 'page1',
                component: _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_4__["PageOneComponent"],
                children: [
                    {
                        path: 'page2',
                        component: _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_6__["PageTwoComponent"],
                        children: [
                            {
                                path: 'page3',
                                component: _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_5__["PageThreeComponent"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
var AccordionsPageModule = /** @class */ (function () {
    function AccordionsPageModule() {
    }
    AccordionsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes), ngx_row_accordion__WEBPACK_IMPORTED_MODULE_2__["NgxRowAccordionModule"].forRoot()],
            declarations: [_accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AccordionsPageComponent"], _page_one_page_one_component__WEBPACK_IMPORTED_MODULE_4__["PageOneComponent"], _page_two_page_two_component__WEBPACK_IMPORTED_MODULE_6__["PageTwoComponent"], _page_three_page_three_component__WEBPACK_IMPORTED_MODULE_5__["PageThreeComponent"]],
        })
    ], AccordionsPageModule);
    return AccordionsPageModule;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-one/page-one.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-one/page-one.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY29yZGlvbnMtcGFnZS9wYWdlLW9uZS9wYWdlLW9uZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/accordions-page/page-one/page-one.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/page-one/page-one.component.ts ***!
  \****************************************************************/
/*! exports provided: PageOneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageOneComponent", function() { return PageOneComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageOneComponent = /** @class */ (function () {
    function PageOneComponent() {
    }
    PageOneComponent.prototype.ngOnInit = function () { };
    PageOneComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-one',
            template: __webpack_require__(/*! raw-loader!./page-one.component.html */ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-one/page-one.component.html"),
            styles: [__webpack_require__(/*! ./page-one.component.scss */ "./src/app/accordions-page/page-one/page-one.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageOneComponent);
    return PageOneComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-three/page-three.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/accordions-page/page-three/page-three.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY29yZGlvbnMtcGFnZS9wYWdlLXRocmVlL3BhZ2UtdGhyZWUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/accordions-page/page-three/page-three.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/accordions-page/page-three/page-three.component.ts ***!
  \********************************************************************/
/*! exports provided: PageThreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageThreeComponent", function() { return PageThreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageThreeComponent = /** @class */ (function () {
    function PageThreeComponent() {
    }
    PageThreeComponent.prototype.ngOnInit = function () { };
    PageThreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-three',
            template: __webpack_require__(/*! raw-loader!./page-three.component.html */ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-three/page-three.component.html"),
            styles: [__webpack_require__(/*! ./page-three.component.scss */ "./src/app/accordions-page/page-three/page-three.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageThreeComponent);
    return PageThreeComponent;
}());



/***/ }),

/***/ "./src/app/accordions-page/page-two/page-two.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/accordions-page/page-two/page-two.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjY29yZGlvbnMtcGFnZS9wYWdlLXR3by9wYWdlLXR3by5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/accordions-page/page-two/page-two.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/accordions-page/page-two/page-two.component.ts ***!
  \****************************************************************/
/*! exports provided: PageTwoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageTwoComponent", function() { return PageTwoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageTwoComponent = /** @class */ (function () {
    function PageTwoComponent() {
    }
    PageTwoComponent.prototype.ngOnInit = function () { };
    PageTwoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-two',
            template: __webpack_require__(/*! raw-loader!./page-two.component.html */ "./node_modules/raw-loader/index.js!./src/app/accordions-page/page-two/page-two.component.html"),
            styles: [__webpack_require__(/*! ./page-two.component.scss */ "./src/app/accordions-page/page-two/page-two.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageTwoComponent);
    return PageTwoComponent;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".level-one {\n  display: -webkit-box;\n  display: flex;\n}\n\n.level-two {\n  -webkit-box-flex: 1;\n          flex: 1 1 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9tYXhpbWUxOTkyL25neC1yb3ctYWNjb3JkaW9uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7QUNDRjs7QURFQTtFQUNFLG1CQUFBO1VBQUEsV0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxldmVsLW9uZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5sZXZlbC10d28ge1xuICBmbGV4OiAxIDEgMDtcbn1cbiIsIi5sZXZlbC1vbmUge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4ubGV2ZWwtdHdvIHtcbiAgZmxleDogMSAxIDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: loadAccordionsPageModule, loadAuxAccordionsPageModule, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAccordionsPageModule", function() { return loadAccordionsPageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAuxAccordionsPageModule", function() { return loadAuxAccordionsPageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _accordions_page_accordions_page_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accordions-page/accordions-page.module */ "./src/app/accordions-page/accordions-page.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _aux_accordions_page_aux_accordions_page_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./aux-accordions-page/aux-accordions-page.module */ "./src/app/aux-accordions-page/aux-accordions-page.module.ts");
/* harmony import */ var _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auxiliary-route-proxy/auxiliary-route-proxy.component */ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









function loadAccordionsPageModule() {
    return _accordions_page_accordions_page_module__WEBPACK_IMPORTED_MODULE_4__["AccordionsPageModule"];
}
function loadAuxAccordionsPageModule() {
    return _aux_accordions_page_aux_accordions_page_module__WEBPACK_IMPORTED_MODULE_6__["AuxAccordionsPageModule"];
}
// for now the build of the project (at least demo) does not work at all
// when using lazy loading like the following
// ----------------------------------------
// {
//   path: 'auxiliary-route',
//   outlet: 'aux',
//   component: AuxiliaryRouteProxyComponent,
//   children: [
//     {
//       path: '',
//       loadChildren: 'app/aux-accordions-page/aux-accordions-page.module#AuxAccordionsPageModule',
//     },
//   ],
// },
// {
//   path: 'app',
//   loadChildren: 'app/accordions-page/accordions-page.module#AccordionsPageModule',
// },
// ----------------------------------------
// it's failing because of CLI issues
// https://github.com/angular/angular-cli/issues/2601
// https://github.com/angular/angular-cli/issues/10750
// https://github.com/angular/angular-cli/issues/7332
// when not using lazy loading, it doesn't work either
// because of https://github.com/angular/angular-cli/issues/4192 ... ¯\_(ツ)_/¯
// tried to explain the vicious circle here:
// https://github.com/angular/angular-cli/issues/2601#issuecomment-393197794
var routes = [
    {
        path: 'auxiliary-route',
        outlet: 'aux',
        component: _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_7__["AuxiliaryRouteProxyComponent"],
        children: [
            {
                path: '',
                loadChildren: loadAuxAccordionsPageModule,
            },
        ],
    },
    {
        path: 'app',
        loadChildren: loadAccordionsPageModule,
    },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _auxiliary_route_proxy_auxiliary_route_proxy_component__WEBPACK_IMPORTED_MODULE_7__["AuxiliaryRouteProxyComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes), _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]],
            providers: [
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_0__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_0__["HashLocationStrategy"],
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1eC1hY2NvcmRpb25zLXBhZ2UvYXV4LWFjY29yZGlvbnMtcGFnZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.component.ts ***!
  \**********************************************************************/
/*! exports provided: AuxAccordionsPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxAccordionsPageComponent", function() { return AuxAccordionsPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuxAccordionsPageComponent = /** @class */ (function () {
    function AuxAccordionsPageComponent() {
    }
    AuxAccordionsPageComponent.prototype.ngOnInit = function () { };
    AuxAccordionsPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-aux-accordions-page',
            template: __webpack_require__(/*! raw-loader!./aux-accordions-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/aux-accordions-page.component.html"),
            styles: [__webpack_require__(/*! ./aux-accordions-page.component.scss */ "./src/app/aux-accordions-page/aux-accordions-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AuxAccordionsPageComponent);
    return AuxAccordionsPageComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/aux-accordions-page.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/aux-accordions-page/aux-accordions-page.module.ts ***!
  \*******************************************************************/
/*! exports provided: AuxAccordionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxAccordionsPageModule", function() { return AuxAccordionsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./aux-accordions-page.component */ "./src/app/aux-accordions-page/aux-accordions-page.component.ts");
/* harmony import */ var _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-five/page-five.component */ "./src/app/aux-accordions-page/page-five/page-five.component.ts");
/* harmony import */ var _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-four/page-four.component */ "./src/app/aux-accordions-page/page-four/page-four.component.ts");
/* harmony import */ var _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-six/page-six.component */ "./src/app/aux-accordions-page/page-six/page-six.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'accordions',
        component: _aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AuxAccordionsPageComponent"],
        children: [
            {
                path: 'page4',
                component: _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_5__["PageFourComponent"],
                children: [
                    {
                        path: 'page5',
                        component: _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_4__["PageFiveComponent"],
                        children: [
                            {
                                path: 'page6',
                                component: _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_6__["PageSixComponent"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
var AuxAccordionsPageModule = /** @class */ (function () {
    function AuxAccordionsPageModule() {
    }
    AuxAccordionsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            declarations: [_aux_accordions_page_component__WEBPACK_IMPORTED_MODULE_3__["AuxAccordionsPageComponent"], _page_four_page_four_component__WEBPACK_IMPORTED_MODULE_5__["PageFourComponent"], _page_five_page_five_component__WEBPACK_IMPORTED_MODULE_4__["PageFiveComponent"], _page_six_page_six_component__WEBPACK_IMPORTED_MODULE_6__["PageSixComponent"]],
        })
    ], AuxAccordionsPageModule);
    return AuxAccordionsPageModule;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-five/page-five.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-five/page-five.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1eC1hY2NvcmRpb25zLXBhZ2UvcGFnZS1maXZlL3BhZ2UtZml2ZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-five/page-five.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-five/page-five.component.ts ***!
  \**********************************************************************/
/*! exports provided: PageFiveComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFiveComponent", function() { return PageFiveComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageFiveComponent = /** @class */ (function () {
    function PageFiveComponent() {
    }
    PageFiveComponent.prototype.ngOnInit = function () { };
    PageFiveComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-five',
            template: __webpack_require__(/*! raw-loader!./page-five.component.html */ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-five/page-five.component.html"),
            styles: [__webpack_require__(/*! ./page-five.component.scss */ "./src/app/aux-accordions-page/page-five/page-five.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageFiveComponent);
    return PageFiveComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-four/page-four.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-four/page-four.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1eC1hY2NvcmRpb25zLXBhZ2UvcGFnZS1mb3VyL3BhZ2UtZm91ci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-four/page-four.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-four/page-four.component.ts ***!
  \**********************************************************************/
/*! exports provided: PageFourComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageFourComponent", function() { return PageFourComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageFourComponent = /** @class */ (function () {
    function PageFourComponent() {
    }
    PageFourComponent.prototype.ngOnInit = function () { };
    PageFourComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-four',
            template: __webpack_require__(/*! raw-loader!./page-four.component.html */ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-four/page-four.component.html"),
            styles: [__webpack_require__(/*! ./page-four.component.scss */ "./src/app/aux-accordions-page/page-four/page-four.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageFourComponent);
    return PageFourComponent;
}());



/***/ }),

/***/ "./src/app/aux-accordions-page/page-six/page-six.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-six/page-six.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1eC1hY2NvcmRpb25zLXBhZ2UvcGFnZS1zaXgvcGFnZS1zaXguY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/aux-accordions-page/page-six/page-six.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/aux-accordions-page/page-six/page-six.component.ts ***!
  \********************************************************************/
/*! exports provided: PageSixComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageSixComponent", function() { return PageSixComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageSixComponent = /** @class */ (function () {
    function PageSixComponent() {
    }
    PageSixComponent.prototype.ngOnInit = function () { };
    PageSixComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-six',
            template: __webpack_require__(/*! raw-loader!./page-six.component.html */ "./node_modules/raw-loader/index.js!./src/app/aux-accordions-page/page-six/page-six.component.html"),
            styles: [__webpack_require__(/*! ./page-six.component.scss */ "./src/app/aux-accordions-page/page-six/page-six.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageSixComponent);
    return PageSixComponent;
}());



/***/ }),

/***/ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1eGlsaWFyeS1yb3V0ZS1wcm94eS9hdXhpbGlhcnktcm91dGUtcHJveHkuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.ts ***!
  \**************************************************************************/
/*! exports provided: AuxiliaryRouteProxyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuxiliaryRouteProxyComponent", function() { return AuxiliaryRouteProxyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuxiliaryRouteProxyComponent = /** @class */ (function () {
    function AuxiliaryRouteProxyComponent() {
    }
    AuxiliaryRouteProxyComponent.prototype.ngOnInit = function () { };
    AuxiliaryRouteProxyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auxiliary-route-proxy',
            template: __webpack_require__(/*! raw-loader!./auxiliary-route-proxy.component.html */ "./node_modules/raw-loader/index.js!./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.html"),
            styles: [__webpack_require__(/*! ./auxiliary-route-proxy.component.scss */ "./src/app/auxiliary-route-proxy/auxiliary-route-proxy.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AuxiliaryRouteProxyComponent);
    return AuxiliaryRouteProxyComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_row_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-row-accordion */ "./dist/ngx-row-accordion/fesm5/ngx-row-accordion.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var shared = [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], ngx_row_accordion__WEBPACK_IMPORTED_MODULE_3__["NgxRowAccordionModule"]];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: shared.slice(),
            exports: shared.slice(),
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/maxime1992/ngx-row-accordion/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map