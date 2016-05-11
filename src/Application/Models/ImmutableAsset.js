class ImmutableAsset {
  constructor(id, name, baseIncome, price, multiplier, owned, unlocked) {
    this.id = id;
    this.name = name;
    this.baseIncome = baseIncome;
    this.price = price;
    this.multiplier = multiplier;
    this.owned = owned;
    this.unlocked = unlocked;
  }
}

export default ImmutableAsset;
