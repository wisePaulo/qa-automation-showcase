import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.lessThan;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

class PublicApiContractTest {

    @Test
    void shouldReturnHealthyPublicDemoStatus() {
        given()
            .baseUri("https://api.public-demo.example")
            .accept(ContentType.JSON)
        .when()
            .get("/status")
        .then()
            .statusCode(200)
            .time(lessThan(750L))
            .body("service", equalTo("public-demo"))
            .body("healthy", equalTo(true));
    }
}

