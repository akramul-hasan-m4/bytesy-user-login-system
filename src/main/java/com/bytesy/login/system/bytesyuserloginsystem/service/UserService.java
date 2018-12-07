package com.bytesy.login.system.bytesyuserloginsystem.service;

import org.springframework.stereotype.Service;

import com.bytesy.login.system.bytesyuserloginsystem.model.User;
/**
 * 
 * @author Akramul Hasan
 * @since 07-12-2018
 *
 */
@Service
public interface UserService {
	
	public void saveUser (User user);
	
	public User checkLoginInfo (String userName, String password);
	
	public User findByEmail(String email);

}
