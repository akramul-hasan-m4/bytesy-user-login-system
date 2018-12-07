package com.bytesy.login.system.bytesyuserloginsystem.configuration;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bytesy.login.system.bytesyuserloginsystem.service.UserService;
import com.bytesy.login.system.bytesyuserloginsystem.serviceimpl.UserServiceimpl;
/**
 * 
 * @author Akramul Hasan
 * @since 07-12-2018
 *
 */
@Configuration
public class BeanConfiguration {

	@Bean
	@Qualifier("userService")
	public UserService userServiceBean() {
		return new UserServiceimpl();
	}
	
}
