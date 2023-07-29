package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int uid;
	
	@Column
	String uname;
	
	@Column
	String Address;
	
	@Column
	int pincode;
	
	@Column
	String bloodgroup;
	
	@Column
	int age;
	
	@Column
	String email;
	
	@Column
	String password;

	@Column
	String contactno;
	public User() 
	{
		super();
		
	}
	public User(String uname, String address, int pincode, String bloodgroup, int age, String email, String password,
			String contactno) {
		super();
		this.uname = uname;
		Address = address;
		this.pincode = pincode;
		this.bloodgroup = bloodgroup;
		this.age = age;
		this.email = email;
		this.password = password;
		this.contactno = contactno;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public int getPincode() {
		return pincode;
	}
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}
	public String getBloodgroup() {
		return bloodgroup;
	}
	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContactno() {
		return contactno;
	}
	public void setContactno(String contactno) {
		this.contactno = contactno;
	}
	@Override
	public String toString() {
		return "User [uid=" + uid + ", uname=" + uname + ", Address=" + Address + ", pincode=" + pincode
				+ ", bloodgroup=" + bloodgroup + ", age=" + age + ", email=" + email + ", password=" + password
				+ ", contactno=" + contactno + "]";
	}

	
	
}
