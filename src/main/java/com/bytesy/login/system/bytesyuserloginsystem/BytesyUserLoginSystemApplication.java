package com.bytesy.login.system.bytesyuserloginsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
/**
 * 
 * @author Akramul Hasan
 * @since 07-12-2018
 *
 */
@SpringBootApplication
public class BytesyUserLoginSystemApplication extends SpringBootServletInitializer{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BytesyUserLoginSystemApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BytesyUserLoginSystemApplication.class, args);
	}
	
}
