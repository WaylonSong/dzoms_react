class StringUtil{
  static safeGet(original, placeholder="-"){
      if(original == "null" || original == null || typeof original == "undefined")
        return placeholder;
      return original;
  }
}
export default StringUtil;