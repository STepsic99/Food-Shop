package beans;

public class DeliveryRequests {
	
	private Deliverer deliverer;
	private String idOrder;
	
	public DeliveryRequests(Deliverer deliverer, String idOrder) {
		super();
		this.deliverer = deliverer;
		this.idOrder = idOrder;
	}

	public Deliverer getDeliverer() {
		return deliverer;
	}

	public void setDeliverer(Deliverer deliverer) {
		this.deliverer = deliverer;
	}

	public String getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(String idOrder) {
		this.idOrder = idOrder;
	}
	
	
	
}
