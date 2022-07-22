package TANDEM.icomtelecom.service_catalogue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
//@EnableSwagger2
public class ServiceCatalogueApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceCatalogueApplication.class, args);
	}


//	@Bean
//	CommandLineRunner runner(ServiceRepository serviceRepository){
//		return args -> {
//			ServiceInfo serviceInfo = new ServiceInfo();
//			serviceInfo.setSerName("testService");
//			serviceInfo.setVersion("0.1");
//			serviceRepository.save(serviceInfo);
//		};
//	}

}
