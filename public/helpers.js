/*
The MIT License (MIT)
Copyright (c) 2014-2018 Nikolai Suslov and the Krestianstvo.org project contributors. (https://github.com/NikolaySuslov/livecodingspace/blob/master/LICENSE.md)

Virtual World Framework Apache 2.0 license  (https://github.com/NikolaySuslov/livecodingspace/blob/master/licenses/LICENSE_VWF.md)
*/

class Helpers {

    constructor() {
        console.log("helpers constructor");
        // List of valid ID characters for use in an instance.
        this.ValidIDChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // List of valid extensions for VWF components.
        this.template_extensions = ["", ".yaml", ".json"];
        this.applicationRoot = "/"; //app
    }

    reduceSaveObject(path) {
        let obj = Object.assign({}, path);

        if(path.saveObject){
            if ( path.saveObject[ "queue" ] ) {
                if ( path.saveObject[ "queue" ][ "time" ] ) {
                    obj.saveObject = {
                        "init": true,
                        "queue":{
                            "time": path.saveObject[ "queue" ][ "time" ]
                        }
                    }
                }
            }
        }

        return obj
    }

    // IsInstanceID tests if the passed in potential Instance ID 
    // is a valid instance id.
    IsInstanceID(potentialInstanceID) {
        if (potentialInstanceID.match(/^[0-9A-Za-z]{16}$/)) {
            return true;
        }
        return false;
    }

    // GenerateInstanceID function creates a randomly generated instance ID.
    GenerateInstanceID() {
        var text = "";

        for (var i = 0; i < 16; i++)
            text += this.ValidIDChars.charAt(Math.floor(Math.random() * this.ValidIDChars.length));

        return text;
    }

    // JoinPath
    // Takes multiple arguments, joins them together into one path.
    JoinPath( /* arguments */) {
        var result = "";
        if (arguments.length > 0) {
            if (arguments[0]) {
                result = arguments[0];
            }
            for (var index = 1; index < arguments.length; index++) {
                var newSegment = arguments[index];
                if (newSegment == undefined) {
                    newSegment = "";
                }

                if ((newSegment[0] == "/") && (result[result.length - 1] == "/")) {
                    result = result + newSegment.slice(1);
                } else if ((newSegment[0] == "/") || (result[result.length - 1] == "/")) {
                    result = result + newSegment;
                } else {
                    result = result + "/" + newSegment;
                }
                //result = libpath.join( result, newSegment );
            }
        }
        return result;
    }

    GetNamespace( processedURL ) {
        if ( ( processedURL[ 'instance' ] ) && ( processedURL[ 'public_path' ] ) ) {
            return this.JoinPath( processedURL[ 'public_path' ], processedURL[ 'application' ], processedURL[ 'instance' ] );
        }
        return undefined;
    }



    // GenerateSegments takes a string, breaks it into
    // '/' separated segments, and removes potential
    // blank first and last segments. 
    GenerateSegments(argument) {
        var result = argument.split("/");
        if (result.length > 0) {
            if (result[0] == "") {
                result.shift();
            }
        }
        if (result.length > 0) {
            if (result[result.length - 1] == "") {
                result.pop();
            }
        }
        return result;
    }

    async GetExtension(path) {

        if (path.match(/\.vwf$/)) {

            // ["", ".yaml", ".json"]

            let check1 = await this.IsFileExist(this.JoinPath(path + "").split(".").join("_"));
            if(check1)
                return ""

            let check2 = await this.IsFileExist(this.JoinPath(path + ".yaml").split(".").join("_"));
            if(check2)
                return ".yaml"

            let check3 = await this.IsFileExist(this.JoinPath(path + ".json").split(".").join("_"));
            if(check3)
                return ".json"




            // for (const res of this.template_extensions) {
            //     let check = await this.IsFileExist(this.JoinPath(path + res).split(".").join("_"));
            //     if (check) return res
            // }
        }

        return undefined;
    }

    get appPath() {
        return JSON.parse(localStorage.getItem('lcs_app')).path.public_path.slice(1)
    }

    get worldStateName() {

        let appConfig = JSON.parse(localStorage.getItem('lcs_app'));

        var saveName = appConfig.path.public_path.slice(1);
        let privatePath = appConfig.path.private_path;
        if (privatePath) {
            if (privatePath.indexOf('load') !== -1) {
                saveName = privatePath.split('/')[1];
            }
        }

        return saveName

    }

    getRoot(noUser) {
        var app = window.location.pathname;
        var pathSplit = app.split('/');
        if (pathSplit[0] == "") {
            pathSplit.shift();
        }
        if (pathSplit[pathSplit.length - 1] == "") {
            pathSplit.pop();
        }
        var inst = undefined;
        var instIndex = pathSplit.length - 1;
        if (pathSplit.length > 2) {
            if (pathSplit[pathSplit.length - 2] == "load") {
                instIndex = pathSplit.length - 3;
            }
        }
        if (pathSplit.length > 3) {
            if (pathSplit[pathSplit.length - 3] == "load") {
                instIndex = pathSplit.length - 4;
            }
        }

        inst = pathSplit[instIndex];

        var root = "";
        for (var i = 0; i < instIndex; i++) {
            if (root != "") {
                root = root + "/";
            }
            root = root + pathSplit[i];
        }

        if (root.indexOf('.vwf') != -1) root = root.substring(0, root.lastIndexOf('/'));

        if (noUser) {
            return {
                "root": root.replace(pathSplit[0] + '/', ""),
                "inst": inst
            }
        } else {

            return {
                "root": root,
                "inst": inst
            }
        }

    }

    get worldUser() {
        return this.getRoot(false).root.split('/')[0];
    }


    randId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }


    GUID() {
        var S4 = function () {
            return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
        };

        return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
    }

    async sha256(message) {

        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    }

    replaceSubStringALL(target, search, replacement) {
        return target.split(search).join(replacement);
    };


    async getHtmlText(url) {

        let file = await fetch(url, { method: 'get' });
        let text = await file.text();
        return text
    }


    removeProps(obj) {
        Object.keys(obj).forEach(key =>
            (key === 'id' || key === 'patches' || key === 'random' || key === 'sequence') && delete obj[key] ||
            (obj[key] && typeof obj[key] === 'object') && this.removeProps(obj[key])
        );
        return obj;
    };

    getNodeDef(nodeID) {
        let node = vwf.getNode(nodeID, true);
        let nodeDefPure = this.removeProps(node);
        let nodeDef = this.removeGrammarObj(nodeDefPure);

        let finalDef = this.replaceFloatArraysInNodeDef(nodeDef); 

        return finalDef
    }

    replaceFloatArraysInNodeDef(state){

        var objectIsTypedArray = function (candidate) {
            var typedArrayTypes = [
              Int8Array,
              Uint8Array,
              // Uint8ClampedArray,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array
            ];
      
            var isTypedArray = false;
      
            if (typeof candidate == "object" && candidate != null) {
              typedArrayTypes.forEach(function (typedArrayType) {
                isTypedArray = isTypedArray || candidate instanceof typedArrayType;
              });
            }
      
            return isTypedArray;
          };
      
          var transitTransformation = function (object) {
            return objectIsTypedArray(object) ?
              Array.prototype.slice.call(object) : object;
          };
      
      
          let value = require("vwf/utility").transform(
            state, transitTransformation
          );
      
          return value

    }

    removeGrammarObj(obj) {
        Object.keys(obj).forEach(key =>
            (key === 'grammar' || key === 'semantics') && delete obj[key] ||
            (obj[key] && typeof obj[key] === 'object') && this.removeGrammarObj(obj[key])
        );
        return obj;
    };


    httpGet(url) {
        return new Promise(function (resolve, reject) {
            // do the usual Http request
            let request = new XMLHttpRequest();
            request.open('GET', url);

            request.onload = function () {
                if (request.status == 200) {
                    resolve(request.response);
                } else {
                    reject(Error(request.statusText));
                }
            };

            request.onerror = function () {
                reject(Error('Network Error'));
            };

            request.send();
        });
    }

    async httpGetJson(url) {
        // check if the URL looks like a JSON file and call httpGet.
        let regex = /\.(json)$/i;

        if (regex.test(url)) {
            // call the async function, wait for the result
            return await this.httpGet(url);
        } else {
            throw Error('Bad Url Format');
        }
    }

    authUser(alias, pass){

        _LCSDB.user().auth(alias, pass
            //     , function(ack) {
    
            //     if (ack.err) {
            //         new Noty({
            //             text: ack.err,
            //             timeout: 2000,
            //             theme: 'mint',
            //             layout: 'bottomRight',
            //             type: 'error'
            //         }).show();
    
            //     }
             //}
             );

    }
    
   testJSON (text) {
        if (typeof text!=="string"){
            return false;
        }
        try{
            JSON.parse(text);
            return true;
        }
        catch (error){
            return false;
        }
    }

    async getUserPub(userName) {

        //TODO: Fix for using hashids instead users aliases with pubs sorted by time of registration
        let alias = '~@' + userName;
        let user = await (new Promise(res=>_LCSDB.get(alias).once(res)));
       
        if(user) {

        if(Object.keys(user).length > 1){
            let pubs = await Promise.all(Object.keys(user).filter(el=>el !== '_').map(el => _LCSDB.user(el.slice(1)).then(res=>{
                let ts = Gun.state.is(res, 'pub')
                return {pub: res.pub, time: ts}
            })))
            //console.log(pubs);
            pubs.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
              });
            
            return pubs[0].pub

        } else {
            return Object.keys(user)[1].slice(1)
        }

    }

    }

    async getUserAlias(userPub) {

        let user = await (new Promise(res=>_LCSDB.user(userPub).get('alias').once(res)));
       
        if(user)
            return user

    }

}

export { Helpers } 