package beans;

public class ShopperType {
	private String name;
	private int discount;
	private double requiredPoints;
	
	public ShopperType() {
		
	}

	public ShopperType(String name, int discount, double requiredPoints) {
		super();
		this.name = name;
		this.discount = discount;
		this.requiredPoints = requiredPoints;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public double getRequiredPoints() {
		return requiredPoints;
	}

	public void setRequiredPoints(double requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
	
	
	
	
}
