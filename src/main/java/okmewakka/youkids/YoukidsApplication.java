package okmewakka.youkids;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"okmewakka.youkids", "okmewakka.youkids.config"})
public class YoukidsApplication {

	public static void main(String[] args) {
		SpringApplication.run(YoukidsApplication.class, args);

	}

}
