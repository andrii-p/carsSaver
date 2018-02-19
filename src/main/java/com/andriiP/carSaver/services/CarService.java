package com.andriiP.carSaver.services;

import com.andriiP.carSaver.dao.Car;

import java.util.List;

/**
 * Created by kurt on 6/18/17.
 */
public interface CarService {

    public Car getById(Long id);

    public List<Car> getCars();

    public Car findByAdNameAndYearMakeModel(String adName, String yearMakeModel);

    public long carsTotal();

    public boolean exists(Long id);

    public void saveCar(Car car);

    public void saveCars(List<Car> cars);

    public void updateCarsViaRSS(String url);
}
