import {OptionFragment} from "../option-fragment"

class UtilClearfix extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Clearfix',
      widget:'OpSwitch',
      required:true,
      group:'utilities',
      onValue:'clearfix',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'utilClearfix'
  }

  copyMeta(from, to){
    to.utilClearfix = from.utilClearfix
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonUtilClearfix = (node)=>{
  let utilClearfix = new UtilClearfix
  utilClearfix.addon(node)
  return utilClearfix
}

export {addonUtilClearfix}

