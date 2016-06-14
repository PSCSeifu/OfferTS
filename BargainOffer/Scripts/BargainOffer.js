var Bargain;
(function (Bargain_1) {
    var Offer = (function () {
        function Offer(Id, Name, ProductName, Price, Status, AcceptPrice, TTL) {
            this.Id = Id;
            this.Name = Name;
            this.ProductName = ProductName;
            this.Price = Price;
            this.Status = Status;
            this.AcceptPrice = AcceptPrice;
            this.TTL = TTL;
            this._id = Id;
            this._name = Name;
            this._productName = ProductName;
            this._price = Price;
            this._status = Status;
            this._acceptPrice = AcceptPrice;
            this._ttl = TTL;
        }
        Offer.prototype.publishOffer = function () {
            //set ttldate
            var activeValue = "[$NAME$ | $PR$ | $TTL$ | $SOLD$]";
            var result = activeValue
                .replace('$NAME$', this._productName)
                .replace("$PR$", this._price.toString())
                .replace('$TTL$', "06:00:55")
                .replace('$SOLD$', this._status.toString());
            var htmlout = this.publishOfferBlock(result, "offerdisplay");
        };
        Offer.prototype.publishOfferBlock = function (htmlContent, className) {
            var node = document.createElement("div");
            //console.log("className:>" + className);
            node.className = className;
            //console.log("node:>" + node);
            var textnode = document.createTextNode(htmlContent);
            node.appendChild(textnode);
            var disparea = document.getElementById("display").appendChild(node);
            //console.log("disparea:> " + disparea);
            return disparea;
        };
        return Offer;
    }());
    Bargain_1.Offer = Offer;
    var Bargain = (function () {
        function Bargain(Id, offerId, price, bargainBy, status) {
            this.Id = Id;
            this.offerId = offerId;
            this.price = price;
            this.bargainBy = bargainBy;
            this.status = status;
            this._id = Id;
            this._offerId = offerId;
            this._price = price;
            this._bargainBy = bargainBy;
            this._status = status;
        }
        Bargain.prototype.publishBargain = function () {
            //set ttldate
            var className = "";
            if (this._bargainBy == "vendor") {
                className = "customerdisplay";
            }
            else {
                className = "vendordisplay";
            }
            var activeValue = "[$PR$ | $TTL$ | $STATUS$]";
            var result = activeValue
                .replace("$PR$", this._price.toString())
                .replace('$TTL$', "06:00:55")
                .replace('$STATUS$', this._status.toString());
            var htmlout = this.publishhBargainBlock(result, className);
        };
        Bargain.prototype.publishhBargainBlock = function (htmlContent, className) {
            var node = document.createElement("div");
            //console.log("className:>" + className);
            node.className = className;
            //console.log("node:>" + node);
            var textnode = document.createTextNode(htmlContent);
            node.appendChild(textnode);
            var disparea = document.getElementById("display").appendChild(node);
            //console.log("disparea:> " + disparea);
            return disparea;
        };
        Bargain.prototype.bargain = function (inputPrice, prevBargain, offer) {
            if (this._bargainBy == "vendor") {
                return this.vendorBargain(inputPrice, prevBargain, offer);
            }
            else {
                return this.customerBargain(inputPrice, prevBargain, offer);
            }
        };
        Bargain.prototype.vendorBargain = function (inputPrice, prevBargain, offer) {
        };
        Bargain.prototype.customerBargain = function (inputPrice, prevBargain, offer) {
            //evaluate  prevOffer for 1. status 
            if (offer._status == "sold") {
                //Done
                return new Bargain(this._id, this._offerId, 0, "customer", "accept");
            }
            else {
            }
        };
        return Bargain;
    }());
    Bargain_1.Bargain = Bargain;
})(Bargain || (Bargain = {}));
//# sourceMappingURL=BargainOffer.js.map