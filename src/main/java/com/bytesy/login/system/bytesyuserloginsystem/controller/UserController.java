package com.bytesy.login.system.bytesyuserloginsystem.controller;

import java.net.URI;
import java.util.Locale;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bytesy.login.system.bytesyuserloginsystem.model.User;
import com.bytesy.login.system.bytesyuserloginsystem.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {

	private static final String EXPIRES = "Expires";
	private static final String PRAGMA = "Pragma";
	private static final String CACHE_CONTROL = "Cache-Control";
	
	@Autowired @Qualifier("userService") UserService userService;
	@Autowired private MessageSource msgSource ;
	
	@GetMapping()
	public String loginPage(Model model) {
		model.addAttribute("user", new User());
		return "views/login";
	}
	
	@GetMapping("/signup")
	public String singupPage() {
		return "views/signup";
	}
	
	@GetMapping("/forgetPassword")
	public String forgetPassPage() {
		return "views/forgetPassword";
	}
	
	@PostMapping("/login")
	public String login(@ModelAttribute User user, Model model) {
		User u = userService.checkLoginInfo(user.getUserName(), user.getPassword());
		if (u != null) {
			model.addAttribute("userName",u.getFirstName()+" "+u.getLastName());
			return "views/SuccessPage";
		}
		else {
			model.addAttribute("loginFailed","Login failed");
			return "views/login";
		}
	}
	
	@PostMapping()
	public ResponseEntity<User> saveUser(@Valid @RequestBody User user, Errors errors , final HttpServletRequest request) {
		final Locale locale = request.getLocale();
		HttpHeaders headers = new HttpHeaders();
		
		if (errors.hasErrors()) {
			headers.add("ERROR_MSG", msgSource.getMessage("common.saveErrorMsg", new String[]{"User", "Saved"}, locale));
				String errorResult = errors.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining(","));
			ResponseEntity.badRequest().body(errorResult);
			return ResponseEntity.noContent().headers(headers).build();
		}
		user.setStatus(Boolean.TRUE);
		userService.saveUser(user);
			headers.add("SUCCESS_MSG", msgSource.getMessage("common.saveSuccessMsg", new String[]{"User", "Saved"}, locale));
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getUserId()).toUri();
		headers.setLocation(location);
		
		return ResponseEntity.created(location).headers(headers).build();
	} 
	
	@PostMapping("/logout")
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (request.isRequestedSessionIdValid() && session != null) {
			session.invalidate();
		}
		response.setHeader(CACHE_CONTROL, "no-cache");
		response.setHeader(PRAGMA, "no-cache");
		response.setHeader(CACHE_CONTROL, "no-store");
		response.setHeader(CACHE_CONTROL, "must-revalidate");
		response.setDateHeader(EXPIRES, 0);
		return "redirect:/";
	}
	
	@GetMapping("/forgetpw/{email}")
	@ResponseBody
	public User checkEmail(@PathVariable String email, Model model) {
		User user = userService.findByEmail(email);
		if (!StringUtils.isEmpty(user)) {
			return user;
		} else {
			return null;
		}
	}
	
}
