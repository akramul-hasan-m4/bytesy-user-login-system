package com.bytesy.login.system.bytesyuserloginsystem.serviceimpl;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.bytesy.login.system.bytesyuserloginsystem.model.User;
import com.bytesy.login.system.bytesyuserloginsystem.repository.UserRepository;
import com.bytesy.login.system.bytesyuserloginsystem.service.UserService;

public class UserServiceimpl implements UserService{

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired private UserRepository repo;
	
	@Override
	@Transactional
	public void saveUser(User user) {
		repo.save(user);
	}

	@Override
	@Transactional
	public User checkLoginInfo(String userName, String password) {
		try {
			return repo.findByUserNameAndPassword(userName, password);
		} catch (Exception e) {
			logger.info("Exception is   -> {}", e.getMessage());
			return null;
		}
		
	}

	@Override
	@Transactional
	public User findByEmail(String email) {
		return repo.findByEmail(email);
	}

}
