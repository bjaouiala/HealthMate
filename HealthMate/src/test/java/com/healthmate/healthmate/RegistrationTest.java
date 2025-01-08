package com.healthmate.healthmate;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class RegistrationTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        WebDriverManager.edgedriver().setup();
        driver = new EdgeDriver();
        driver.manage().window().maximize();
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void testRegistration() {
        driver.get("http://localhost:4200/authentication/register");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        // Locate and fill all required fields
        WebElement firstNameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("firstname")));
        WebElement lastNameField = driver.findElement(By.id("lastname"));
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement phoneNumberField = driver.findElement(By.cssSelector("input[formControlName='phoneNumber']"));
        WebElement addressField = driver.findElement(By.id("address"));

        firstNameField.sendKeys("test");
        lastNameField.sendKeys("test");
        emailField.sendKeys("test@gmail.com");
        passwordField.sendKeys("Test 123456789");
        phoneNumberField.sendKeys("1234567890");
        addressField.sendKeys("123 test Street");

        WebElement signUpButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[type='submit']")));

        signUpButton.click();

        WebElement confirmationMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("welcomeMessage")));
        assertNotNull(confirmationMessage, "Le message de bienvenue n'est pas visible après l'enregistrement.");

        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/authentication/activation-account"), "L'utilisateur n'a pas été redirigé vers le tableau de bord après l'enregistrement !");
    }
}
