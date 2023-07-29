package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.UserServices;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	UserServices userv;
	
	
	@PostMapping("/saveuser")
	public int Save(@RequestBody  User u)
	{
		
			userv.saveUser(u);
			
				return u.getUid();
	}
}
