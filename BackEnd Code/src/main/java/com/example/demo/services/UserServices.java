package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserServices {

	@Autowired
	UserRepository urepo;
	
	public boolean saveUser(User u)
	{
		boolean flag;
		try {
			urepo.save(u);
			flag=true;
		}
		catch(Exception e)
		{
			flag=false;
		}
		
		 return flag;
	}
	
	
}
