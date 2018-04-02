class StringUtil{
  static safeGet(original, placeholder="-"){
      if(original == "null" || original == null)
        return placeholder;
      return original;
  }
}
export default StringUtil;