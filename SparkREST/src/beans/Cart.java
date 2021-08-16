package beans;

import java.util.ArrayList;

public class Cart {
	private ArrayList<Article>articles;
	private Shopper shopper;
	private double price;
	
	public Cart() {
	
	}

	public Cart(ArrayList<Article> articles, Shopper shopper, double price) {
		super();
		this.articles = articles;
		this.shopper = shopper;
		this.price = price;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public Shopper getShopper() {
		return shopper;
	}

	public void setShopper(Shopper shopper) {
		this.shopper = shopper;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
}
