package com.episteme.api.services;

import java.util.List;

public interface IService<Entity,Id> {
    public Entity save(Entity entity);
    public Entity update(Entity entity, Id id);
    public void delete(Id id);
    public List<Entity> findAll();
    public Entity findById(Id id);
}
