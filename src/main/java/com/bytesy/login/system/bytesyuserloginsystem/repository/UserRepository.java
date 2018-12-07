package com.bytesy.login.system.bytesyuserloginsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bytesy.login.system.bytesyuserloginsystem.model.User;
/**
 * 
 * @author Akramul Hasan
 * @since 07-12-2018
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	User findByUserNameAndPassword(String userName, String password);
	
	User findByEmail(String email);

}
